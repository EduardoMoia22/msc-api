import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { PresenceRepository } from "src/repositories/presence.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { UserRepository } from "src/repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, UserRepository, TeacherRepository, PresenceRepository],
    exports: [UserRepository, TeacherRepository, PresenceRepository]
})
export class DataModule {

}