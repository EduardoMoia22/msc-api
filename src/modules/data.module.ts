import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { PresenceRepository } from "src/repositories/presence.repository";
import { StudentRepository } from "src/repositories/student.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { UserRepository } from "src/repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository, UserRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository, UserRepository]
})
export class DataModule {

}