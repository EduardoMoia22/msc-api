import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TeacherRequestDTO } from "src/DTOs/teacher.dtos";
import { Teacher } from "src/entities/teacher.entity";
import { TeacherMapper } from "src/mappers/teacher.mapper";
import { TeacherRepository } from "src/repositories/teacher.repository";

@Injectable()
export class TeacherService {
    constructor(private readonly teacherRepository: TeacherRepository) { }

    public async createTeacher(data: TeacherRequestDTO): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(data.email);

        if (teacherExists) {
            throw new HttpException("Teacher already exists.", HttpStatus.NOT_FOUND);
        }

        const teacher: Teacher = TeacherMapper.requestDtoToEntity(data);

        return await this.teacherRepository.create(teacher);
    }

    public async findTeacherById(id: number): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findById(id);

        if (!teacherExists) {
            throw new HttpException("Teacher not found.", HttpStatus.NOT_FOUND);
        }

        return teacherExists;
    }

    public async findTeacherByEmail(email: string): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(email);

        if (!teacherExists) {
            throw new HttpException("Teacher not found.", HttpStatus.NOT_FOUND);
        }

        return teacherExists;
    }

    public async findAllTeachers(): Promise<Teacher[]> {
        return await this.teacherRepository.findAll();
    }
}