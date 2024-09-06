import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Teacher } from "entities/teacher.entity";

export class TeacherRequestDTO {
    @ApiProperty({ description: 'Nome do professor' })
    @IsNotEmpty({
        message: "Nome é obrigatório"
    })
    @Length(4, 256, { message: 'O nome deve ter no minimo 4 caracteres.' })
    public name: string;

    @ApiProperty({ description: 'Email do professor' })
    @IsNotEmpty({
        message: "Email é obrigatório"
    })
    @IsEmail({}, { message: "Insira um email válido." })
    public email: string;
}

export class TeacherResponseDTO {
    @ApiProperty({ description: 'Id do professor' })
    public readonly id: number;

    @ApiProperty({ description: 'Nome do professor' })
    public readonly name: string;

    @ApiProperty({ description: 'Email do professor' })
    public readonly email: string;

    constructor(
        id: number,
        name: string,
        email: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromEntity(teacher: Teacher): TeacherResponseDTO {
        return new TeacherResponseDTO(teacher.getId, teacher.getName, teacher.getEmail);
    }
}