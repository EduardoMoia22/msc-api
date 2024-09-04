import { StudentRequestDTO } from "DTOs/student.dtos";
import { Student } from "entities/student.entity";
import { Student as RawStudent } from "@prisma/client";

export class StudentMapper {
    public static requestDtoToEntity(data: StudentRequestDTO): Student {
        return Student.Builder
            .withName(data.name)
            .withEmail(data.email)
            .withCPF(data.cpf)
            .build();
    }

    public static prismaToEntity(data: RawStudent): Student {
        return Student.Builder
            .withId(data.id)
            .withRM(data.rm)
            .withName(data.name)
            .withEmail(data.email)
            .withCPF(data.cpf)
            .withEntryDate(data.entryDate)
            .withPassword(data.password)
            .build();
    }

    public static entityToPrisma(data: Student): Omit<RawStudent, "id"> {
        return {
            rm: data.getRM,
            name: data.getName,
            email: data.getEmail,
            cpf: data.getCPF,
            entryDate: data.getEntryDate,
            password: data.getRM
        }
    }
}
