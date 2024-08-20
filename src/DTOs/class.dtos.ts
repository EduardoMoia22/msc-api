import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";
import { TeacherResponseDTO } from "./teacher.dtos";
import { StudentResponseDTO } from "./student.dtos";
import { Class } from "src/entities/class.entity";
import { Student } from "src/entities/student.entity";

export class ClassRequestDTO {
    @ApiProperty({ description: 'Id do professor.' })
    @IsNotEmpty({
        message: "O id do professor é obrigatório."
    })
    public teacherId: number;

    @ApiProperty({ description: 'Data e hora do início da aula.' })
    @IsNotEmpty({
        message: "A data e hora de início são obrigatórias."
    })
    public startsAt: Date;

    @ApiProperty({ description: 'Data e hora do final da aula.' })
    @IsNotEmpty({
        message: "A data e hora de término são obrigatórias."
    })
    public endsAt: Date;

    @ApiProperty({ description: 'Lista de IDs de alunos na aula.' })
    @IsArray()
    @IsNotEmpty({
        message: "A lista de alunos é obrigatória."
    })
    public studentIds: string[];
}

export class ClassResponseDTO {
    @ApiProperty({ description: 'Id da classe.' })
    public readonly id: number;

    @ApiProperty({ description: 'Professor da classe.' })
    public readonly teacher: TeacherResponseDTO;

    @ApiProperty({ description: 'Alunos da classe.' })
    public readonly students: StudentResponseDTO[]

    @ApiProperty({ description: 'Data e hora do início da classe.' })
    public readonly startsAt: Date;

    @ApiProperty({ description: 'Data e hora do final da classe.' })
    public readonly endsAt: Date;

    private constructor(
        id: number,
        teacher: TeacherResponseDTO,
        students: StudentResponseDTO[],
        startsAt: Date,
        endsAt: Date
    ) {
        this.id = id;
        this.teacher = teacher;
        this.students = students;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }

    public static fromEntity(classEntity: Class): ClassResponseDTO {
        const students: StudentResponseDTO[] = classEntity.getStudents.map((student: Student) => {
            return StudentResponseDTO.fromEntity(student);
        })

        return new ClassResponseDTO(
            classEntity.getId,
            TeacherResponseDTO.fromEntity(classEntity.getTeacher),
            students,
            classEntity.getStartsAt,
            classEntity.getEndsAt
        );
    }
}