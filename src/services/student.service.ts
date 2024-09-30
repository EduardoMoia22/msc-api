import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StudentRequestDTO } from "DTOs/student.dtos";
import { Student } from "entities/student.entity";
import { StudentMapper } from "mappers/student.mapper";
import { StudentRepository } from "repositories/student.repository";
import { Utils } from "tools/utils.tool";


@Injectable()
export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) { }

    public async createStudent(data: StudentRequestDTO): Promise<Student> {
        const studentEmailExists: Student | null = await this.studentRepository.findByEmail(data.email);
        const studentCPFExists: Student | null = await this.studentRepository.findByCPF(data.cpf);

        if (studentEmailExists) {
            throw new HttpException("Já existe um aluno cadastrado com o mesmo email. Verifique novamente as informações.", HttpStatus.CONFLICT);
        }

        if (studentCPFExists) {
            throw new HttpException("Já existe um aluno cadastrado com o mesmo cpf. Verifique novamente as informações.", HttpStatus.CONFLICT);
        }

        const student: Student = StudentMapper.requestDtoToEntity(data);

        const currentDatetime: Date = Utils.getCurrentDateTimeBR();
        student.setEntryDate = currentDatetime;

        const lastStudent: Student | null = await this.studentRepository.findLastStudentByEntryYear(currentDatetime.getFullYear().toString());
        student.generateRM(lastStudent);

        console.log(student.getRM);

        return await this.studentRepository.create(student);
    }

    public async findStudentById(id: number): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findById(id);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByEmail(email: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByEmail(email);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByPassword(password: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByPassword(password);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByRM(RM: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByRM(RM);


        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findStudentByCPF(cpf: string): Promise<Student> {
        const studentExists: Student | null = await this.studentRepository.findByCPF(cpf);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        return studentExists;
    }

    public async findAllStudents(): Promise<Student[]> {
        return await this.studentRepository.findAll();
    }

    public async updateStudent(id: number, data: StudentRequestDTO): Promise<Student> {
        const studentExists: Student = await this.findStudentById(id);
        const checkIfThereIsAlreadyStudentWithThatCPF: Student | null = await this.studentRepository.findByCPF(data.cpf);
        const checkIfThereIsAlreadyStudentWithThatEMAIL: Student | null = await this.studentRepository.findByEmail(data.email);
        const errors: { message: string, code: HttpStatus }[] = [];

        if (checkIfThereIsAlreadyStudentWithThatCPF && (checkIfThereIsAlreadyStudentWithThatCPF.getId !== studentExists.getId)) {
            errors.push({
                message: "Já existe um aluno cadastrado com esse cpf. Verifique novamente as informações.",
                code: HttpStatus.CONFLICT
            });
        }

        if (checkIfThereIsAlreadyStudentWithThatEMAIL && (checkIfThereIsAlreadyStudentWithThatEMAIL.getId !== studentExists.getId)) {
            errors.push({
                message: "Já existe um aluno cadastrado com esse email. Verifique novamente as informações.",
                code: HttpStatus.CONFLICT
            });
        }

        if (errors.length > 0) {
            throw new HttpException(
                { errors },
                HttpStatus.CONFLICT
            );
        }

        studentExists.updateAllAllowedFields(
            data.name,
            data.cpf,
            data.email
        )

        return await this.studentRepository.update(studentExists);
    }
}