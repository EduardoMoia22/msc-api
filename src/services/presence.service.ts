import { Presence } from "src/entities/presence.entity";
import { PresenceRepository } from "src/repositories/presence.repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class PresenceService {
    constructor(
        private readonly presenceRepository: PresenceRepository,
    ) { }

    public async createPresence(presence: Presence): Promise<Presence> {
        // const student: Student = await this.studentService.findStudentByPassword(data.studentPassword);
        // const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(data.teacherId));

        // const classEntity = await this.classService.findClassById(data.classId);

        const now = new Date();
        const finalClassTime = new Date(now.getTime() + (60 * 60 * 1000) + (30 * 60 * 1000));

        const existingPresence: Presence | null = await this.presenceRepository.findPresenceByStudentAndTeacherAndTime(
            presence.getStudent.getId,
            presence.getTeacher.getId,
            now,
            finalClassTime
        );

        if (existingPresence && Presence.isDuplicate(existingPresence, now, finalClassTime)) {
            throw new HttpException('A presença já foi registrada para este aluno, professor e intervalo de tempo.', HttpStatus.CONFLICT);
        }

        return await this.presenceRepository.create(presence);
    }
}
