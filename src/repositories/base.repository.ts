import { PrismaService } from "src/configs/prisma.service";

export abstract class BaseRepository{
    constructor(protected prisma: PrismaService) { }
}