import { Global, Module } from "@nestjs/common";
import { PrismaService } from "configs/prisma.service";
import { PresenceRepository } from "repositories/presence.repository";
import { StudentRepository } from "repositories/student.repository";
import { TeacherRepository } from "repositories/teacher.repository";
import { UserRepository } from "repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository, UserRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository, UserRepository]
})
export class DataModule {

}