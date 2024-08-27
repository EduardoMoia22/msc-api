import { PrismaService } from "src/configs/prisma.service";
import { Injectable } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { StudentMapper } from "src/mappers/Student.mapper";

@Injectable()
export class StudentRepository {
    constructor(protected prisma: PrismaService) { }
    public async create(student: Student): Promise<Student> {
        const createStudent = await this.prisma.student.create({
            data: StudentMapper.entityToPrisma(student)
        });

        return StudentMapper.prismaToEntity(createStudent);
    }

    public async findById(id: number): Promise<Student | null> {
        const student = await this.prisma.student.findUnique({
            where: {
                id: id
            }
        });

        if (!student) {
            return null;
        }

        return StudentMapper.prismaToEntity(student);
    }

    public async findByEmail(email: string): Promise<Student | null> {
        const student = await this.prisma.student.findFirst({
            where: {
                email
            }
        });

        if (!student) {
            return null;
        }

        return StudentMapper.prismaToEntity(student);
    }

    public async findByPassword(password: string): Promise<Student | null> {
        const student = await this.prisma.student.findFirst({
            where: {
                password: password
            }
        });

        if (!student) {
            return null;
        }

        return StudentMapper.prismaToEntity(student);
    }

    public async findByCPF(cpf: string): Promise<Student | null> {
        const student = await this.prisma.student.findUnique({
            where: {
                cpf: cpf
            }
        });

        if (!student) {
            return null;
        }

        return StudentMapper.prismaToEntity(student);
    }

    public async findAll(): Promise<Student[]> {
        const students = await this.prisma.student.findMany();

        return Promise.all(
            students.map(async (student) => {
                return StudentMapper.prismaToEntity(student);
            })
        );
    }
}