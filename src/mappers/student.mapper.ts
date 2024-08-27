import { StudentRequestDTO } from "src/DTOs/student.dtos";
import { Student } from "src/entities/student.entity";
import { Student as RawStudent } from "@prisma/client";

export class StudentMapper {
    public static requestDtoToEntity(data: StudentRequestDTO): Student {
        return Student.Builder
            .withName(data.name)
            .withEmail(data.email)
            .withCPF(data.cpf)
            .withPassword(data.password)
            .build();
    }

    public static prismaToEntity(data: RawStudent): Student {
        return Student.Builder
            .withId(data.id)
            .withName(data.name)
            .withEmail(data.email)
            .withCPF(data.cpf)
            .withPassword(data.password)
            .build();
    }

    public static entityToPrisma(data: Student): Omit<RawStudent, "id"> {
        return {
            name: data.getName,
            email: data.getEmail,
            cpf: data.getCPF,
            password: data.getPassword
        }
    }
}
