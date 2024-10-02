import { Module } from "@nestjs/common";
import { TeacherController } from "src/controllers/teacher.controller";
import { TeacherService } from "src/services/teacher.service";
import { CachingModule } from "./cache.module";
import { ExcelReaderModule } from "./excel-reader.module";
import { QueueModule } from "./queue.module";
import { TeacherProcessor } from "src/processors/teacher.processor";

@Module({
    imports: [CachingModule, ExcelReaderModule, QueueModule],
    controllers: [TeacherController],
    providers: [TeacherService, TeacherProcessor],
    exports: [TeacherService]
})
export class TeacherModule {
}