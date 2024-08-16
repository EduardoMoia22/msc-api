import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserResponseDTO } from "./user.dtos";
import { TeacherResponseDTO } from "./teacher.dtos";
import { Presence } from "src/entities/presence.entity";
import { StudentResponseDTO } from "./student.dtos";

export class PresenceRequestDTO {
    @ApiProperty({ description: 'Senha de reconhecimento do aluno.' })
    @IsNotEmpty({
        message: "Senha do aluno é obrigatória"
    })
    public studentPassword: string;

    @ApiProperty({ description: 'Id do professor.' })
    @IsNotEmpty({
        message: "O id do professor é obrigatório."
    })
    public teacherId: string;
}

export class PresenceResponseDTO {
    @ApiProperty({ description: 'Id da presença.' })
    public readonly id: number;

    @ApiProperty({ description: 'Aluno que solicitou a presença.' })
    public readonly user: UserResponseDTO;

    @ApiProperty({ description: 'Professor que dará aula para o aluno.' })
    public readonly teacher: TeacherResponseDTO;

    @ApiProperty({ description: 'Data e hora do início da aula.' })
    public readonly startsAt: Date;

    @ApiProperty({ description: 'Data e hora do final da aula.' })
    public readonly endsAt: Date;

    private constructor(
        id: number,
        user: UserResponseDTO,
        teacher: TeacherResponseDTO,
        startsAt: Date,
        endsAt: Date,
    ) {
        this.id = id;
        this.user = user;
        this.teacher = teacher;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }

    public static fromEntity(presence: Presence): PresenceResponseDTO {
        return new PresenceResponseDTO(
            presence.getId,
            StudentResponseDTO.fromEntity(presence.getStudent),
            TeacherResponseDTO.fromEntity(presence.getTeacher),
            presence.getStartsAt,
            presence.getEndsAt
        );
    }


}