import { Injectable } from "@nestjs/common";
import { PrismaService } from "configs/prisma.service";
import { Presence } from "entities/presence.entity";
import { PresenceMapper } from "mappers/presence.mapper";

@Injectable()
export class PresenceRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(presence: Presence): Promise<Presence> {
        const createPresence = await this.prisma.presences.create({
            data: {
                studentId: presence.getStudent.getId,
                teacherId: presence.getTeacher.getId,
                startsAt: presence.getStartsAt,
                endAt: presence.getEndsAt
            },
            include: {
                student: true,
                teacher: true
            }
        });

        return PresenceMapper.prismaToEntity(createPresence);
    }

    public async findPresenceByStudentAndTeacherAndTime(studentId: number, teacherId: number, startsAt: Date, endsAt: Date): Promise<Presence | null> {
        const presence = await this.prisma.presences.findFirst({
            where: {
                studentId: studentId,
                teacherId: teacherId,
                startsAt: {
                    lte: endsAt,
                },
                endAt: {
                    gte: startsAt,
                }
            },
            include: {
                student: true,
                teacher: true
            }
        });

        if (!presence) {
            return null;
        }

        return PresenceMapper.prismaToEntity(presence);
    }
}