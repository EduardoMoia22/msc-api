import { Module } from "@nestjs/common";
import { EnrollmentController } from "src/controllers/enrollment.controller";
import { EnrollmentService } from "src/services/enrollment.service";
import { PlanModule } from "./plan.module";
import { StudentModule } from "./student.module";

@Module({
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
    imports: [PlanModule, StudentModule],
    exports: [EnrollmentService]
})
export class EnrollmentModule { }