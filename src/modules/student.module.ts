import { Module } from "@nestjs/common";
import { StudentController } from "src/controllers/student.controller";
import { StudentService } from "src/services/student.service";
import { CachingModule } from "./cache.module";
import { ExcelReaderModule } from "./excel-reader.module";
import { QueueModule } from "./queue.module";
import { StudentProcessor } from "src/processors/student.processor";

@Module({
    imports: [CachingModule, ExcelReaderModule, QueueModule],
    controllers: [StudentController],
    providers: [StudentService, StudentProcessor],
    exports: [StudentService]
})
export class StudentModule {
}