import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TeacherRequestDTO } from "DTOs/teacher.dtos";
import { Teacher } from "entities/teacher.entity";
import { TeacherMapper } from "mappers/teacher.mapper";
import { TeacherRepository } from "repositories/teacher.repository";

@Injectable()
export class TeacherService {
    constructor(private readonly teacherRepository: TeacherRepository) { }

    public async createTeacher(data: TeacherRequestDTO): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(data.email);

        if (teacherExists) {
            throw new HttpException("Já existe um professor cadastrado com esse email. Verifique novamente as informações", HttpStatus.NOT_FOUND);
        }

        const teacher: Teacher = TeacherMapper.requestDtoToEntity(data);

        return await this.teacherRepository.create(teacher);
    }

    public async findTeacherById(id: number): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findById(id);

        if (!teacherExists) {
            throw new HttpException("Professor não encontrado.", HttpStatus.NOT_FOUND);
        }

        return teacherExists;
    }

    public async findTeacherByEmail(email: string): Promise<Teacher> {
        const teacherExists: Teacher | null = await this.teacherRepository.findByEmail(email);

        if (!teacherExists) {
            throw new HttpException("Professor não encontrado.", HttpStatus.NOT_FOUND);
        }

        return teacherExists;
    }

    public async findAllTeachers(): Promise<Teacher[]> {
        return await this.teacherRepository.findAll();
    }

    public async updateTeacher(id: number, data: TeacherRequestDTO): Promise<Teacher> {
        const teacherExists: Teacher = await this.findTeacherById(id);
        const checkIfThereIsAlreadyTeacherWithThatEMAIL: Teacher | null = await this.teacherRepository.findByEmail(data.email);

        if (checkIfThereIsAlreadyTeacherWithThatEMAIL && (checkIfThereIsAlreadyTeacherWithThatEMAIL.getId !== teacherExists.getId)) {
            throw new HttpException(
                "Já existe um professor cadastrado com esse email. Verifique novamente as informações.",
                HttpStatus.CONFLICT
            );
        }

        teacherExists.updateAllAllowedFields(
            data.name,
            data.email
        )

        return await this.teacherRepository.update(teacherExists);
    }
}