import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StudentRequestDTO } from "DTOs/student.dtos";
import { Student } from "entities/student.entity";
import { StudentMapper } from "mappers/student.mapper";
import { StudentRepository } from "repositories/student.repository";
import { Utils } from "tools/utils.tool";
import { CacheService } from "./cache.service";
import { ExcelReaderService } from "./excel-reader.service";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class StudentService {
    private readonly STUDENT_LIST_CACHE_KEY = this.cacheService.generateListCacheKey('students');
    private readonly CACHE_TTL = 3600000;

    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly cacheService: CacheService,
        private readonly excelReaderService: ExcelReaderService,
        @InjectQueue('student-queue') private studentQueue: Queue,
    ) { }

    private async invalidateStudentCache(
        studentId: number,
        email?: string,
        rm?: string,
        cpf?: string
    ): Promise<void> {
        const cacheKeys = [
            this.cacheService.generateCacheKey('student', studentId),
            this.STUDENT_LIST_CACHE_KEY
        ];

        if (email) {
            cacheKeys.push(this.cacheService.generateCacheKey('student_email', email));
        }

        if (rm) {
            cacheKeys.push(this.cacheService.generateCacheKey('student_rm', rm));
        }

        if (cpf) {
            cacheKeys.push(this.cacheService.generateCacheKey('student_cpf', cpf));
        }

        await this.cacheService.invalidateMultiple(cacheKeys);
    }

    public async createStudent(data: StudentRequestDTO): Promise<Student> {
        const studentEmailExists: Student | null = await this.studentRepository.findByEmail(data.email);
        const studentCPFExists: Student | null = await this.studentRepository.findByCPF(data.cpf);

        if (studentEmailExists) {
            throw new HttpException(`Já existe um aluno cadastrado com o mesmo email ${data.email}. Verifique novamente as informações.`, HttpStatus.CONFLICT);
        }

        if (studentCPFExists) {
            throw new HttpException("Já existe um aluno cadastrado com o mesmo cpf. Verifique novamente as informações.", HttpStatus.CONFLICT);
        }

        const student: Student = StudentMapper.requestDtoToEntity(data);

        const currentDatetime: Date = Utils.getCurrentGMTDateTime();
        student.setEntryDate = currentDatetime;

        const lastStudent: Student | null = await this.studentRepository.findLastStudentByEntryYear(currentDatetime.getFullYear().toString());
        student.generateRM(lastStudent);

        const createdStudent: Student = await this.studentRepository.create(student)
        await this.cacheService.del(this.STUDENT_LIST_CACHE_KEY);
        return createdStudent;
    }

    public async findStudentById(id: number): Promise<Student> {
        const cacheKey = this.cacheService.generateCacheKey('student', id);
        const cachedStudent = await this.cacheService.get<Student>(cacheKey);

        if (cachedStudent) {
            console.log(`Fetching student with ID ${id} from cache.`);
            return cachedStudent;
        }

        const studentExists: Student | null = await this.studentRepository.findById(id);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, studentExists, this.CACHE_TTL);

        return studentExists;
    }

    public async findStudentByEmail(email: string): Promise<Student> {
        const cacheKey = this.cacheService.generateCacheKey('student_email', email);
        const cachedStudent = await this.cacheService.get<Student>(cacheKey);

        if (cachedStudent) {
            console.log(`Fetching student with email ${email} from cache.`);
            return cachedStudent;
        }

        const studentExists: Student | null = await this.studentRepository.findByEmail(email);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, studentExists, this.CACHE_TTL);

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
        const cacheKey = this.cacheService.generateCacheKey('student_rm', RM);
        const cachedStudent = await this.cacheService.get<Student>(cacheKey);

        if (cachedStudent) {
            console.log(`Fetching student with RM ${RM} from cache.`);
            return cachedStudent;
        }

        const studentExists: Student | null = await this.studentRepository.findByRM(RM);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, studentExists, this.CACHE_TTL);

        return studentExists;
    }

    public async findStudentByCPF(cpf: string): Promise<Student> {
        const cacheKey = this.cacheService.generateCacheKey('student_cpf', cpf);
        const cachedStudent = await this.cacheService.get<Student>(cacheKey);

        if (cachedStudent) {
            console.log(`Fetching student with cpf ${cpf} from cache.`);
            return cachedStudent;
        }

        const studentExists: Student | null = await this.studentRepository.findByCPF(cpf);

        if (!studentExists) {
            throw new HttpException("Aluno não encontrado.", HttpStatus.NOT_FOUND);
        }

        await this.cacheService.set(cacheKey, studentExists, this.CACHE_TTL);

        return studentExists;
    }

    public async findAllStudents(): Promise<Student[]> {
        const cachedStudents = await this.cacheService.get<Student[]>(this.STUDENT_LIST_CACHE_KEY);

        if (cachedStudents) {
            console.log('Fetching students from cache.');
            return cachedStudents;
        }

        console.log('Fetching students from the database...');
        const students: Student[] = await this.studentRepository.findAll();

        await this.cacheService.set(this.STUDENT_LIST_CACHE_KEY, students, this.CACHE_TTL);
        return students;
    }

    public async updateStudent(id: number, data: StudentRequestDTO): Promise<Student> {
        const studentExists: Student = await this.findStudentById(id);
        const emailBeforeUpdate: string = studentExists.getEmail;
        const cpfBeforeUpdate: string = studentExists.getCPF
        const existingTeacherWithCpf: Student | null = await this.studentRepository.findByCPF(data.cpf);
        const existingTeacherWithEmail: Student | null = await this.studentRepository.findByEmail(data.email);
        const errors: { message: string, code: HttpStatus }[] = [];

        if (existingTeacherWithCpf && (existingTeacherWithCpf.getId !== studentExists.getId)) {
            errors.push({
                message: "Já existe um aluno cadastrado com esse cpf. Verifique novamente as informações.",
                code: HttpStatus.CONFLICT
            });
        }

        if (existingTeacherWithEmail && (existingTeacherWithEmail.getId !== studentExists.getId)) {
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

        const updatedStudent: Student = await this.studentRepository.update(studentExists);

        await this.invalidateStudentCache(id, emailBeforeUpdate, studentExists.getRM, cpfBeforeUpdate);

        return updatedStudent;
    }

    public async createUsersWithExcel(filename: string): Promise<boolean> {
        try {
            const students = await this.excelReaderService.readExcelFile(filename, StudentRequestDTO);

            if (!students || students.length === 0) {
                throw new HttpException('Nenhum aluno foi encontrado no arquivo Excel.', HttpStatus.BAD_REQUEST);
            }

            await this.studentQueue.add("process-student-creation-excel", students, { priority: 1 });

            return true;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: `Erro ao processar o arquivo Excel: ${error.message || 'Erro desconhecido'}`
            }, HttpStatus.BAD_REQUEST);
        }
    }
}