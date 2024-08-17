import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Teacher } from "src/entities/teacher.entity";

@Injectable()
export class TeacherRepository {
    constructor(protected prisma: PrismaService) { }

    public async create(teacher: Teacher): Promise<Teacher> {
        const createTeacher = await this.prisma.teacher.create({
            data: {
                name: teacher.getName,
                email: teacher.getEmail
            }
        });

        return Teacher.Builder
            .withId(createTeacher.id)
            .withName(createTeacher.name)
            .withEmail(createTeacher.email)
            .build();
    }

    public async findById(id: number): Promise<Teacher | null> {
        const teacher = await this.prisma.teacher.findUnique({
            where: {
                id: id
            }
        });

        if (!teacher) {
            return null;
        }

        return Teacher.Builder
            .withId(teacher.id)
            .withName(teacher.name)
            .withEmail(teacher.email)
            .build();
    }

    public async findByEmail(email: string): Promise<Teacher | null> {
        const teacher = await this.prisma.teacher.findUnique({
            where: {
                email: email
            }
        });

        if (!teacher) {
            return null;
        }

        return Teacher.Builder
            .withId(teacher.id)
            .withName(teacher.name)
            .withEmail(teacher.email)
            .build();
    }

    public async findAll(): Promise<Teacher[]> {
        const teachers = await this.prisma.teacher.findMany();

        return Promise.all(
            teachers.map(async (teacher) => {
                return Teacher.Builder
                    .withId(teacher.id)
                    .withName(teacher.name)
                    .withEmail(teacher.email)
                    .build();
            }),
        );
    }
}