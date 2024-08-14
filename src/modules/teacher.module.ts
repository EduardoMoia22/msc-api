import { Module } from "@nestjs/common";
import { TeacherController } from "src/controllers/teacher.controller";
import { TeacherService } from "src/services/teacher.service";

@Module({
    controllers: [TeacherController],
    providers: [TeacherService]
})
export class TeacherModule {
}