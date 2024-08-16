import { PrismaService } from "src/configs/prisma.service";
import { Injectable } from "@nestjs/common";
import { Student } from "src/entities/student.entity";

@Injectable()
export class StudentRepository {
    constructor(protected prisma: PrismaService) { }
    public async create(student: Student): Promise<Student> {
        const createStudent = await this.prisma.student.create({
            data: {
                name: student.getName,
                email: student.getEmail,
                password: student.getPassword
            }
        });

        return Student.Builder
            .withId(createStudent.id)
            .withName(createStudent.name)
            .withEmail(createStudent.email)
            .withPassword(createStudent.password)
            .build();
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

        return Student.Builder
            .withId(student.id)
            .withName(student.name)
            .withEmail(student.email)
            .build();
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

        return Student.Builder
            .withId(student.id)
            .withName(student.name)
            .withEmail(student.email)
            .build();
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

        return Student.Builder
            .withId(student.id)
            .withName(student.name)
            .withEmail(student.email)
            .build();
    }
}