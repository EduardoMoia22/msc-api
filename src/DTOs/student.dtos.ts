import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
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

    @ApiProperty({ description: 'CPF do aluno' })
    @IsNotEmpty({
        message: "CPF é obrigatório"
    })
    @Length(11, 11)
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