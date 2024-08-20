import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserResponseDTO } from "./user.dtos";
import { TeacherResponseDTO } from "./teacher.dtos";
import { Presence } from "src/entities/presence.entity";
import { StudentResponseDTO } from "./student.dtos";
import { ClassResponseDTO } from "./class.dtos";


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
    @IsString({ message: "O id do professor deve ser um número." })
    public teacherId: string;

    @ApiProperty({ description: 'Id da classe.' })
    @IsNotEmpty({
        message: "O id da classe é obrigatório."
    })
    @IsNumber({}, { message: "O id da classe deve ser um número." })
    public classId: number;
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

    @ApiProperty({ description: 'Classe em que a presença foi registrada.' })  // Novo campo adicionado
    public readonly classEntity: ClassResponseDTO;

    private constructor(
        id: number,
        user: UserResponseDTO,
        teacher: TeacherResponseDTO,
        startsAt: Date,
        endsAt: Date,
        classEntity: ClassResponseDTO // Adicionado no construtor
    ) {
        this.id = id;
        this.user = user;
        this.teacher = teacher;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.classEntity = classEntity; // Atribuição do novo campo
    }

    public static fromEntity(presence: Presence): PresenceResponseDTO {
        return new PresenceResponseDTO(
            presence.getId,
            StudentResponseDTO.fromEntity(presence.getStudent),
            TeacherResponseDTO.fromEntity(presence.getTeacher),
            presence.getStartsAt,
            presence.getEndsAt,
            ClassResponseDTO.fromEntity(presence.getClass) // Conversão da entidade classe
        );
    }
}