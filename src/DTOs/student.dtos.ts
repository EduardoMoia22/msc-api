import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Student } from "entities/student.entity";

export class StudentRequestDTO {
    @ApiProperty({ description: 'Nome do aluno', minimum: 4 })
    @IsNotEmpty({
        message: "Nome é obrigatório"
    })
    @Length(4, 256, { message: 'O nome deve ter no minimo 4 caracteres' })
    public name: string;

    @ApiProperty({ description: 'Email do aluno'})
    @IsNotEmpty({
        message: "Email é obrigatório"
    })
    @IsEmail({}, { message: "Insira um email válido" })
    public email: string;

    @ApiProperty({ description: 'CPF do aluno',  minimum: 11, maximum: 11 })
    @IsNotEmpty({
        message: "CPF é obrigatório"
    })
    @Length(11, 11, { message: 'O CPF deve ter 11 caracteres' })
    public cpf: string;
}

export class StudentResponseDTO {
    @ApiProperty({ description: 'Id do aluno' })
    public readonly id: number;

    @ApiProperty({ description: 'Rm do aluno' })
    public readonly rm: string;

    @ApiProperty({ description: 'Nome do aluno' })
    public readonly name: string;

    @ApiProperty({ description: 'Email do aluno' })
    public readonly email: string;

    @ApiProperty({ description: 'CPF do aluno' })
    public readonly cpf: string;

    @ApiProperty({ description: 'Data de cadastro do aluno' })
    public readonly entryDate: Date;

    private constructor(
        id: number,
        rm: string,
        name: string,
        email: string,
        cpf: string,
        entryDate: Date
    ) {
        this.id = id;
        this.rm = rm;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.entryDate = entryDate;
    }

    static fromEntity(student: Student): StudentResponseDTO {
        return new StudentResponseDTO(student.getId, student.getRM, student.getName, student.getEmail, student.getFormattedCpf, student.getEntryDate);
    }
}