import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { ClassRepository } from "src/repositories/class.repository";
import { PresenceRepository } from "src/repositories/presence.repository";
import { StudentRepository } from "src/repositories/student.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { UserRepository } from "src/repositories/user.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ClassRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository, UserRepository, ClassRepository]
})
export class DataModule {

}