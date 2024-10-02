import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TeacherRequestDTO } from "src/DTOs/teacher.dtos";
import { Teacher } from "src/entities/teacher.entity";
import { TeacherMapper } from "src/mappers/teacher.mapper";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { CacheService } from "./cache.service";

@Injectable()
export class TeacherService {
    private readonly TEACHER_LIST_CACHE_KEY = this.cacheService.generateListCacheKey('teachers');
    private readonly CACHE_TTL = 3600000;

    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly cacheService: CacheService
    ) { }

    private async invalidateTeacherCache(teacherId: number, email?: string): Promise<void> {
        const cacheKeys = [
            this.cacheService.generateCacheKey('teacher', teacherId),
            this.TEACHER_LIST_CACHE_KEY
        ];

        if (email) {
            cacheKeys.push(this.cacheService.generateCacheKey('teacher_email', email));
        }

        await this.cacheService.invalidateMultiple(cacheKeys);
    }

    public async createTeacher(data: TeacherRequestDTO): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(data.email);

        if (teacherExists) {
            throw new HttpException("Já existe um professor cadastrado com esse email. Verifique novamente as informações", HttpStatus.NOT_FOUND);
        }

        const teacher: Teacher = TeacherMapper.requestDtoToEntity(data);

        const createdTeacher: Teacher = await this.teacherRepository.create(teacher);

        this.cacheService.del(this.TEACHER_LIST_CACHE_KEY);

        return createdTeacher;
    }

    public async findTeacherById(id: number): Promise<Teacher> {
        const cacheKey = this.cacheService.generateCacheKey('teacher', id);
        const cachedTeacher = await this.cacheService.get<Teacher>(cacheKey);

        if (cachedTeacher) {
            console.log(`Fetching teacher with ID ${id} from cache.`);
            return cachedTeacher;
        }

        const teacherExists: Teacher | null = await this.teacherRepository.findById(id);

        if (!teacherExists) {
            throw new HttpException("Professor não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, teacherExists, this.CACHE_TTL);

        return teacherExists;
    }

    public async findTeacherByEmail(email: string): Promise<Teacher> {
        const cacheKey = this.cacheService.generateCacheKey('teacher_email', email);
        const cachedTeacher = await this.cacheService.get<Teacher>(cacheKey);

        if (cachedTeacher) {
            console.log(`Fetching teacher with email ${email} from cache.`);
            return cachedTeacher;
        }

        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(email);

        if (!teacherExists) {
            throw new HttpException("Professor não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, teacherExists, this.CACHE_TTL);

        return teacherExists;
    }

    public async findAllTeachers(): Promise<Teacher[]> {
        const cachedTeachers = await this.cacheService.get<Teacher[]>(this.TEACHER_LIST_CACHE_KEY);

        if (cachedTeachers) {
            console.log('Fetching teachers from cache.');
            return cachedTeachers;
        }

        console.log('Fetching teachers from the database...');
        const teachers: Teacher[] = await this.teacherRepository.findAll();

        await this.cacheService.set(this.TEACHER_LIST_CACHE_KEY, teachers, this.CACHE_TTL);
        return teachers;
    }

    public async updateTeacher(id: number, data: TeacherRequestDTO): Promise<Teacher> {
        const teacherExists: Teacher = await this.findTeacherById(id);
        const emailBeforeUpdate = teacherExists.getEmail;
        const existingTeacherWithEmail: Teacher | null = await this.teacherRepository.findByEmail(data.email);

        if (existingTeacherWithEmail && (existingTeacherWithEmail.getId !== teacherExists.getId)) {
            throw new HttpException(
                "Já existe um professor cadastrado com esse email. Verifique novamente as informações.",
                HttpStatus.CONFLICT
            );
        }

        teacherExists.updateAllAllowedFields(
            data.name,
            data.email
        )

        const updatedTeacher: Teacher = await this.teacherRepository.update(teacherExists);

        await this.invalidateTeacherCache(id, emailBeforeUpdate);

        return updatedTeacher
    }
}