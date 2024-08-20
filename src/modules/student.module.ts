import { Module } from "@nestjs/common";
import { StudentController } from "src/controllers/student.controller";
import { StudentService } from "src/services/student.service";

@Module({
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule {}
