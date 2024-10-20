import { PresenceRequestDTO } from "src/DTOs/presence.dtos";
import { Presence } from "src/entities/presence.entity";
import { Prisma } from "@prisma/client";
import { TeacherMapper } from "./teacher.mapper";
import { Presences as RawPresence } from "@prisma/client";
import { StudentMapper } from "./student.mapper";

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
            .withNumberOfClases(data.quantityOfClasses)
            .withStartsAt(data.startsAt)
            .withEndsAt(data.endAt)
            .build();
    }

    public static entityToPrisma(data: Presence): Omit<RawPresence, "id"> {
        return {
            studentId: data.getStudent.getId,
            teacherId: data.getTeacher.getId,
            quantityOfClasses: data.getquantityOfClasses,
            endAt: data.getEndsAt,
            startsAt: data.getStartsAt
        }
    }
}