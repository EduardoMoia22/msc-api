import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { User } from "src/entities/user.entity";

export class UserRequestDTO {
    @ApiProperty({ description: 'Nome do usuário' })
    @IsNotEmpty({
        message: "Nome é obrigatório."
    })
    @Length(4, 256, { message: 'O nome deve ter no minimo 4 caracteres.' })
    public name: string;

    @ApiProperty({ description: 'Email do usuário' })
    @IsNotEmpty({
        message: "Email é obrigatório."
    })
    @IsEmail({}, { message: "Insira um email válido." })
    public email: string;

    @ApiProperty({ description: 'Senha do usuário', minimum: 6 })
    @IsNotEmpty({
        message: "Senha é obrigatório."
    })
    @Length(6, 50, { message: 'A senha deve ter no minimo 6 caracteres.' })
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