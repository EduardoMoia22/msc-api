import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClassRequestDTO } from "src/DTOs/class.dtos";
import { Class } from "src/entities/class.entity";
import { Teacher } from "src/entities/teacher.entity";
import { ClassRepository } from "src/repositories/class.repository";
import { TeacherService } from "./teacher.service";
import { StudentService } from "./student.service";
import { Student } from "src/entities/student.entity";
import { PresenceService } from "./presence.service";
import { Presence } from "src/entities/presence.entity";

@Injectable()
export class ClassService {
    constructor(
        private readonly classRepository: ClassRepository,
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
        private readonly presenceService: PresenceService
    ) { }

    public async createClass(data: ClassRequestDTO): Promise<Class> {
        const uniqueStudentIds = new Set(data.studentIds);
        if (uniqueStudentIds.size !== data.studentIds.length) {
            throw new BadRequestException('IDs de alunos duplicados foram fornecidos.');
        }

        const teacher: Teacher = await this.teacherService.findTeacherById(data.teacherId);

        const students: Student[] = await Promise.all(
            data.studentIds.map(async (studentId: string) => {
                return await this.studentService.findStudentById(parseInt(studentId));
            })
        );

        const classEntity: Class = Class.Builder
            .withTeacher(teacher)
            .withStudents(students)
            .withStartsAt(data.startsAt)
            .withEndsAt(data.endsAt)
            .build();

        const createClass = await this.classRepository.create(classEntity);

        Promise.all(
            classEntity.getStudents.map(async (student: Student) => {
                const presence: Presence = Presence.Builder
                    .withClass(createClass)
                    .withStudent(student)
                    .withTeacher(createClass.getTeacher)
                    .withStartsAt(createClass.getStartsAt)
                    .withEndsAt(createClass.getEndsAt)
                    .build()
                await this.presenceService.createPresence(presence);
            })
        )
        return createClass;
    }

    public async findClassById(id: number): Promise<Class> {
        const classEntity: Class | null = await this.classRepository.findById(id);

        if (!classEntity) {
            throw new HttpException("Aula não encontrada.", HttpStatus.NOT_FOUND);
        }

        return classEntity;
    }
}