import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Presence } from "src/entities/presence.entity";
import { Teacher } from "src/entities/teacher.entity";
import { User } from "src/entities/user.entity";

@Injectable()
export class PresenceRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(presence: Presence): Promise<Presence> {
        const createPresence = await this.prisma.presences.create({
            data: {
                userId: presence.getUser.getId,
                teacherId: presence.getTeacher.getId,
                endAt: presence.getEndsAt
            },
            include: {
                user: true,
                teacher: true
            }
        });

        return Presence.Builder
            .withId(createPresence.id)
            .withUser(User.Builder
                .withId(createPresence.user.id)
                .withName(createPresence.user.name)
                .withEmail(createPresence.user.email)
                .build()
            )
            .withTeacher(Teacher.Builder
                .withId(createPresence.teacher.id)
                .withName(createPresence.teacher.name)
                .withEmail(createPresence.teacher.email)
                .build()
            )
            .withStartsAt(createPresence.startsAt)
            .withEndsAt(createPresence.endAt)
            .build();
    }
}