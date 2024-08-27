import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StudentRequestDTO } from "src/DTOs/student.dtos";
import { Student } from "src/entities/student.entity";
import { StudentMapper } from "src/mappers/Student.mapper";
import { StudentRepository } from "src/repositories/student.repository";


@Injectable()
export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) { }

    public async createStudent(data: StudentRequestDTO): Promise<Student> {
        const studentEmailExists: Student | null = await this.studentRepository.findByEmail(data.email);
        const studentCPFExists: Student | null = await this.studentRepository.findByCPF(data.cpf);

        if (studentEmailExists || studentCPFExists) {
            throw new HttpException("student already exists", HttpStatus.NOT_FOUND);
        }

        const student: Student = StudentMapper.requestDtoToEntity(data);

        return await this.studentRepository.create(student);
    }

    public async findStudentById(id: number): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findById(id);

        if (!studentExists) {
            throw new HttpException("Student not found.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByEmail(email: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByEmail(email);

        if (!studentExists) {
            throw new HttpException("Student not found.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByPassword(password: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByPassword(password);

        if (!studentExists) {
            throw new HttpException("Student not found.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByCPF(cpf: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByCPF(cpf);

        if (!studentExists) {
            throw new HttpException("Student not found.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findAllStudents(): Promise<Student[]> {
        return await this.studentRepository.findAll();
    }
}