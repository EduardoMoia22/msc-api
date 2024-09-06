import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { ConfigRepository } from "src/repositories/config.repository";
import { PresenceRepository } from "src/repositories/presence.repository";
import { StudentRepository } from "src/repositories/student.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { UserRepository } from "src/repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ConfigRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ConfigRepository]
})
export class DataModule {

}