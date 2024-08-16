import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Presence } from "src/entities/presence.entity";
import { Student } from "src/entities/student.entity";
import { Teacher } from "src/entities/teacher.entity";

@Injectable()
export class PresenceRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(presence: Presence): Promise<Presence> {
        const createPresence = await this.prisma.presences.create({
            data: {
                studentId: presence.getStudent.getId,
                teacherId: presence.getTeacher.getId,
                startsAt: presence.getStartsAt,
                endAt: presence.getEndsAt
            },
            include: {
                student: true,
                teacher: true
            }
        });

        return Presence.Builder
            .withId(createPresence.id)
            .withStudent(Student.Builder
                .withId(createPresence.student.id)
                .withName(createPresence.student.name)
                .withEmail(createPresence.student.email)
                .build()
            )
            .withTeacher(Teacher.Builder
                .withId(createPresence.teacher.id)
                .withName(createPresence.teacher.name)
                .withEmail(createPresence.teacher.email)
                .build()
            )
            .withStartsAt(createPresence.startsAt)
            .withEndsAt(createPresence.endAt)
            .build();
    }

    public async findPresenceByStudentAndTeacherAndTime(studentId: number, teacherId: number, startsAt: Date, endsAt: Date): Promise<Presence | null> {
        const presence = await this.prisma.presences.findFirst({
            where: {
                studentId: studentId,
                teacherId: teacherId,
                startsAt: {
                    lte: endsAt,
                },
                endAt: {
                    gte: startsAt,
                }
            },
            include: {
                student: true,
                teacher: true
            }
        });

        if (!presence) {
            return null;
        }

        return Presence.Builder
            .withId(presence.id)
            .withStudent(Student.Builder
                .withId(presence.student.id)
                .withName(presence.student.name)
                .withEmail(presence.student.email)
                .build()
            )
            .withTeacher(Teacher.Builder
                .withId(presence.teacher.id)
                .withName(presence.teacher.name)
                .withEmail(presence.teacher.email)
                .build()
            )
            .withStartsAt(presence.startsAt)
            .withEndsAt(presence.endAt)
            .build();

    }
}