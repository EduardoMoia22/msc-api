import { Presence } from "src/entities/presence.entity";
import { PresenceRepository } from "src/repositories/presence.repository";
import { UserService } from "./user.service";
import { TeacherService } from "./teacher.service";
import { User } from "src/entities/user.entity";
import { Teacher } from "src/entities/teacher.entity";
import { Injectable } from "@nestjs/common";

export type createPresenceProps = {
    userId: string;
    teacherId: string;
}

@Injectable()
export class PresenceService {
    constructor(private readonly presenceRepository: PresenceRepository,
        private readonly userService: UserService,
        private readonly teacherService: TeacherService
    ) { }

    public async createPresence(data: createPresenceProps): Promise<Presence> {
        const user: User = await this.userService.findUserById(parseInt(data.userId));
        const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(data.teacherId));

        const presence: Presence = Presence.Builder
            .withUser(user)
            .withTeacher(teacher)
            .withEndsAt(new Date())
            .build();

        return await this.presenceRepository.create(presence);
    }
}