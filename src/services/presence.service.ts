import { Presence } from "entities/presence.entity";
import { PresenceRepository } from "repositories/presence.repository";
import { TeacherService } from "./teacher.service";
import { Teacher } from "entities/teacher.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "entities/student.entity";
import { PresenceRequestDTO } from "DTOs/presence.dtos";
import { ConfigService } from "./config.service";
import { TimeTools } from "tools/time.tools";

@Injectable()
export class PresenceService {
    constructor(
        private readonly presenceRepository: PresenceRepository,
        private readonly studentService: StudentService,
        private readonly teacherService: TeacherService,
        private readonly configService: ConfigService
    ) { }

    public async createPresence(data: PresenceRequestDTO): Promise<Presence> {
        const student: Student = await this.studentService.findStudentByRM(data.studentRM);
        const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(data.teacherId));

        const classDurationInminutes: number = (await this.configService.listConfig()).getClassDurationInMinutes;
        const totalDurationOfClassesInMinutes: number = TimeTools.calculateTotalClassesDurationInMinutes(classDurationInminutes, data.quantityOfClasses);

        const now = new Date();
        const gmtOffset = -3; // GMT-3
        // Ajusta o `now` para o fuso horário GMT-3
        now.setUTCHours(now.getUTCHours() + gmtOffset);
        const finalClassTime: Date = TimeTools.addMinutes(now, totalDurationOfClassesInMinutes);

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
            .withNumberOfClases(data.quantityOfClasses)
            .build();

        return await this.presenceRepository.create(presence);
    }

    public async listPresences(studentId?: number, teacherId?: number, startDate?: string, endDate?: string): Promise<Presence[]> {
        studentId ? await this.studentService.findStudentById(studentId) : undefined;
        teacherId ? await this.teacherService.findTeacherById(teacherId) : undefined;

        let start: Date | undefined;
        let end: Date | undefined;

        if (startDate && TimeTools.isValidDate(startDate)) {
            start = new Date(startDate);
            start.setUTCHours(0, 0, 0, 0);
        } else if (startDate) {
            throw new HttpException(`Data inválida fornecida: ${startDate}`, HttpStatus.BAD_REQUEST);
        }

        if (endDate && TimeTools.isValidDate(endDate)) {
            end = new Date(endDate);
            end.setUTCHours(23, 59, 59, 999);
        } else if (endDate) {
            throw new HttpException(`Data inválida fornecida: ${endDate}`, HttpStatus.BAD_REQUEST);
        }

        return await this.presenceRepository.listPresences(studentId, teacherId, start, end);
    }
}