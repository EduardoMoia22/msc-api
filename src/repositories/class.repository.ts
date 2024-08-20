import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Class } from "src/entities/class.entity";
import { Student } from "src/entities/student.entity";
import { Teacher } from "src/entities/teacher.entity";

@Injectable()
export class ClassRepository {
    constructor(
        private readonly prisma: PrismaService) { }

    public async create(classEntity: Class): Promise<Class> {
        const classStudents = classEntity.getStudents.map((student: Student) => {
            return {
                studentId: student.getId
            }
        });

        const createClass = await this.prisma.class.create({
            data: {
                teacherId: classEntity.getTeacher.getId,
                ClassStudents: {
                    create: classStudents
                },
                startsAt: classEntity.getStartsAt,
                endsAt: classEntity.getEndsAt
            },
            include: {
                ClassStudents: {
                    include: {
                        student: true,
                    },
                },
                teacher: true
            }
        });

        const teacher = Teacher.Builder
            .withId(createClass.teacher.id)
            .withName(createClass.teacher.name)
            .withEmail(createClass.teacher.email)
            .build();

        const students = createClass.ClassStudents.map((classStudent) => {
            return Student.Builder
                .withId(classStudent.student.id)
                .withName(classStudent.student.name)
                .withEmail(classStudent.student.email)
                .withPassword(classStudent.student.password)
                .build();
        });

        const createdClass = new Class(
            createClass.id,
            teacher,
            students,
            createClass.startsAt,
            createClass.endsAt
        );

        return createdClass;
    }

    public async findById(id: number): Promise<Class | null> {
        const createClass = await this.prisma.class.findUnique({
            where: {
                id: id
            },
            include: {
                ClassStudents: {
                    include: {
                        student: true,
                    },
                },
                teacher: true
            }
        });

        const teacher = Teacher.Builder
            .withId(createClass.teacher.id)
            .withName(createClass.teacher.name)
            .withEmail(createClass.teacher.email)
            .build();

        const students = createClass.ClassStudents.map((classStudent) => {
            return Student.Builder
                .withId(classStudent.student.id)
                .withName(classStudent.student.name)
                .withEmail(classStudent.student.email)
                .withPassword(classStudent.student.password)
                .build();
        });

        const createdClass = new Class(
            createClass.id,
            teacher,
            students,
            createClass.startsAt,
            createClass.endsAt
        );

        return createdClass;
    }
}