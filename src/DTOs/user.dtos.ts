import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "src/entities/user.entity";

export class UserRequestDTO {
    @ApiProperty({ description: 'Nome do usuário' })
    @IsNotEmpty({
        message: "Nome é obrigatório."
    })
    public name: string;

    @ApiProperty({ description: 'Email do usuário' })
    @IsNotEmpty({
        message: "Email é obrigatório."
    })
    @IsEmail()
    public email: string;

    @ApiProperty({ description: 'Senha do usuário' })
    @IsNotEmpty({
        message: "Senha é obrigatório."
    })
    public password: string;
}

export class UserResponseDTO {
    @ApiProperty({ description: 'Id do usuário' })
    public readonly id: number;

    @ApiProperty({ description: 'Nome do usuário' })
    public readonly name: string;

    @ApiProperty({ description: 'Email do usuário' })
    public readonly email: string;

    private constructor(
        id: number,
        name: string,
        email: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromEntity(user: User): UserResponseDTO {
        return new UserResponseDTO(user.getId, user.getName, user.getEmail);
    }
}