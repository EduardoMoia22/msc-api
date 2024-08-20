import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Student } from "src/entities/student.entity";

export class StudentRequestDTO {
    @ApiProperty({ description: 'Nome do aluno' })
    @IsNotEmpty({
        message: "Nome é obrigatório"
    })
    public name: string;

    @ApiProperty({ description: 'Email do aluno' })
    @IsNotEmpty({
        message: "Email é obrigatório"
    })
    @IsEmail()
    public email: string;

    @ApiProperty({ description: 'Senha do aluno' })
    @IsNotEmpty({
        message: "Senha é obrigatório"
    })
    public password: string;
}

export class StudentResponseDTO {
    @ApiProperty({ description: 'Id do aluno' })
    public readonly id: number;

    @ApiProperty({ description: 'Nome do aluno' })
    public readonly name: string;

    @ApiProperty({ description: 'Email do aluno' })
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

    static fromEntity(student: Student): StudentResponseDTO {
        return new StudentResponseDTO(student.getId, student.getName, student.getEmail);
    }
}