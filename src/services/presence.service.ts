import { Presence } from "src/entities/presence.entity";
import { PresenceRepository } from "src/repositories/presence.repository";
import { UserService } from "./user.service";
import { TeacherService } from "./teacher.service";
import { User } from "src/entities/user.entity";
import { Teacher } from "src/entities/teacher.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

export type createPresenceProps = {
    password: string;
    teacherId: string;
}

@Injectable()
export class PresenceService {
    constructor(private readonly presenceRepository: PresenceRepository,
        private readonly userService: UserService,
        private readonly teacherService: TeacherService
    ) { }

    public async createPresence(data: createPresenceProps): Promise<Presence> {
        const user: User = await this.userService.findUserByPassword(data.password);
        const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(data.teacherId));

        const now = new Date();
        const finalClassTime = new Date(now.getTime() + (60 * 60 * 1000) + (30 * 60 * 1000));

        const existingPresence: Presence | null = await this.presenceRepository.findPresenceByUserAndTeacherAndTime(
            user.getId,
            teacher.getId,
            now,
            finalClassTime
        );

        if (existingPresence && Presence.isDuplicate(existingPresence, now, finalClassTime)) {
            throw new HttpException('A presença já foi registrada para este usuário, professor e intervalo de tempo.', HttpStatus.CONFLICT);
        }

        const presence: Presence = Presence.Builder
            .withUser(user)
            .withTeacher(teacher)
            .withStartsAt(now)
            .withEndsAt(finalClassTime)
            .build();

        return await this.presenceRepository.create(presence);
    }
}