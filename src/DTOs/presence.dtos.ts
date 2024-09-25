import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { UserResponseDTO } from "./user.dtos";
import { TeacherResponseDTO } from "./teacher.dtos";
import { Presence } from "src/entities/presence.entity";
import { StudentResponseDTO } from "./student.dtos";

export class PresenceRequestDTO {
    @ApiProperty({ description: 'Rm do aluno.' })
    @IsNotEmpty({
        message: "Rm do aluno é obrigatório"
    })
    public studentRM: string;

    @ApiProperty({ description: 'Id do professor.' })
    @IsNotEmpty({
        message: "O id do professor é obrigatório."
    })
    public teacherId: string;

    @ApiProperty({ description: "Quantidade de aulas" })
    @IsNotEmpty({
        message: "Quantidade de aulas é obrigatória"
    })
    @IsNumber({}, { message: "Quantidade de aulas deve ser um número" })
    public quantityOfClasses: number;
}

export class PresenceResponseDTO {
    @ApiProperty({ description: 'Id da presença.' })
    public readonly id: number;

    @ApiProperty({ description: 'Aluno que solicitou a presença.' })
    public readonly student: UserResponseDTO;

    @ApiProperty({ description: 'Professor que dará aula para o aluno.' })
    public readonly teacher: TeacherResponseDTO;

    @ApiProperty({ description: 'Quantidade de aulas' })
    public readonly quantityOfClasses: number;

    @ApiProperty({ description: 'Data e hora do início da aula.' })
    public readonly startsAt: Date;

    @ApiProperty({ description: 'Data e hora do final da aula.' })
    public readonly endsAt: Date;

    private constructor(
        id: number,
        student: StudentResponseDTO,
        teacher: TeacherResponseDTO,
        quantityOfClasses: number,
        startsAt: Date,
        endsAt: Date,
    ) {
        this.id = id;
        this.student = student;
        this.teacher = teacher;
        this.quantityOfClasses = quantityOfClasses;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }

    public static fromEntity(presence: Presence): PresenceResponseDTO {
        return new PresenceResponseDTO(
            presence.getId,
            StudentResponseDTO.fromEntity(presence.getStudent),
            TeacherResponseDTO.fromEntity(presence.getTeacher),
            presence.getquantityOfClasses,
            presence.getStartsAt,
            presence.getEndsAt
        );
    }


}