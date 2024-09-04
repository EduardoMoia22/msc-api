import { PrismaService } from "configs/prisma.service";

export abstract class BaseRepository {
    constructor(protected prisma: PrismaService) { }
}