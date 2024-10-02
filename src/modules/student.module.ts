import { Module } from "@nestjs/common";
import { StudentController } from "src/controllers/student.controller";
import { StudentService } from "src/services/student.service";
import { CachingModule } from "./cache.module";

@Module({
    imports:[CachingModule],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {
}