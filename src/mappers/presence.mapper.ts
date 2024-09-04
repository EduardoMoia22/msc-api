import { PresenceRequestDTO } from "DTOs/presence.dtos";
import { Presence } from "entities/presence.entity";
import { Prisma } from "@prisma/client";
import { StudentMapper } from "./Student.mapper";
import { TeacherMapper } from "./teacher.mapper";
import { Presences as RawPresence } from "@prisma/client";

type PresenceWithStudentAndTeacher = Prisma.PresencesGetPayload<{
    include: {
        student: true,
        teacher: true
    }
}>

export class PresenceMapper {
    public static prismaToEntity(data: PresenceWithStudentAndTeacher): Presence {
        return Presence.Builder
            .withId(data.id)
            .withStudent(StudentMapper.prismaToEntity(data.student))
            .withTeacher(TeacherMapper.prismaToEntity(data.teacher))
            .withStartsAt(data.startsAt)
            .withEndsAt(data.endAt)
            .build();
    }

    public static entityToPrisma(data: Presence): Omit<RawPresence, "id"> {
        return {
            studentId: data.getStudent.getId,
            teacherId: data.getTeacher.getId,
            endAt: data.getEndsAt,
            startsAt: data.getStartsAt
        }
    }
}