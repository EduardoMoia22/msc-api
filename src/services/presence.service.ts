import { Presence } from "entities/presence.entity";
import { PresenceRepository } from "repositories/presence.repository";
import { TeacherService } from "./teacher.service";
import { Teacher } from "entities/teacher.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "entities/student.entity";
import { PresenceRequestDTO } from "DTOs/presence.dtos";

@Injectable()
export class PresenceService {
    constructor(private readonly presenceRepository: PresenceRepository,
        private readonly studentService: StudentService,
        private readonly teacherService: TeacherService
    ) { }

    public async createPresence(data: PresenceRequestDTO): Promise<Presence> {
        const student: Student = await this.studentService.findStudentByPassword(data.studentPassword);
        const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(data.teacherId));

        const now = new Date();
        const finalClassTime = new Date(now.getTime() + (60 * 60 * 1000) + (30 * 60 * 1000));

        const existingPresence: Presence | null = await this.presenceRepository.findPresenceByStudentAndTeacherAndTime(
            student.getId,
            teacher.getId,
            now,
            finalClassTime
        );

        if (existingPresence && Presence.isDuplicate(existingPresence, now, finalClassTime)) {
            throw new HttpException('A presença já foi registrada para este aluno, professor e intervalo de tempo.', HttpStatus.CONFLICT);
        }

        const presence: Presence = Presence.Builder
            .withStudent(student)
            .withTeacher(teacher)
            .withStartsAt(now)
            .withEndsAt(finalClassTime)
            .build();

        return await this.presenceRepository.create(presence);
    }
}