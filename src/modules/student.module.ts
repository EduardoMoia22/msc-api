import { Module } from "@nestjs/common";
import { StudentController } from "controllers/student.controller";
import { StudentService } from "services/student.service";
import { CachingModule } from "./cache.module";
import { ExcelReaderModule } from "./excel-reader.module";
import { QueueModule } from "./queue.module";
import { StudentProcessor } from "processors/student.processor";

@Module({
    imports: [CachingModule, ExcelReaderModule, QueueModule],
    controllers: [StudentController],
    providers: [StudentService, StudentProcessor],
    exports: [StudentService]
})
export class StudentModule {
}