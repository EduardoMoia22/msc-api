import { UserRequestDTO } from "DTOs/user.dtos";
import { User } from "entities/user.entity";
import { User as RawUser } from "@prisma/client";

export class UserMapper {
    public static requestDtoToEntity(data: UserRequestDTO): User {
        return User.Builder
            .withName(data.name)
            .withEmail(data.email)
            .withPassword(data.password)
            .build();
    }

    public static prismaToEntity(data: RawUser): User {
        return User.Builder
            .withId(data.id)
            .withName(data.name)
            .withEmail(data.email)
            .withPassword(data.password)
            .build();
    }

    public static entityToPrisma(data: User): Omit<RawUser, "id"> {
        return {
            name: data.getName,
            email: data.getEmail,
            password: data.getPassword
        }
    }
}