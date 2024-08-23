import { TeacherRequestDTO } from "src/DTOs/teacher.dtos";
import { Teacher } from "src/entities/teacher.entity";
import { Teacher as RawTeacher } from "@prisma/client";

export class TeacherMapper {
    public static requestDtoToEntity(data: TeacherRequestDTO): Teacher {
        return Teacher.Builder
            .withName(data.name)
            .withEmail(data.email)
            .build();
    }

    public static prismaToEntity(data: RawTeacher): Teacher {
        return Teacher.Builder
            .withId(data.id)
            .withName(data.name)
            .withEmail(data.email)
            .build();
    }

    public static entityToPrisma(data: Teacher): Omit<RawTeacher, "id"> {
        return {
            name: data.getName,
            email: data.getEmail,
        }
    }
}