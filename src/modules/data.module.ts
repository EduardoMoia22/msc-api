import { Global, Module } from "@nestjs/common";
import { PrismaService } from "configs/prisma.service";
import { ConfigRepository } from "repositories/config.repository";
import { PresenceRepository } from "repositories/presence.repository";
import { StudentRepository } from "repositories/student.repository";
import { TeacherRepository } from "repositories/teacher.repository";
import { UserRepository } from "repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ConfigRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ConfigRepository]
})
export class DataModule {

}