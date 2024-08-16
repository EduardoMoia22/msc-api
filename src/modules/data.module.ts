import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { PresenceRepository } from "src/repositories/presence.repository";
import { StudentRepository } from "src/repositories/student.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";

@Global()
@Module({
    providers: [PrismaService, StudentRepository, TeacherRepository, PresenceRepository],
    exports: [StudentRepository, TeacherRepository, PresenceRepository]
})
export class DataModule {

}