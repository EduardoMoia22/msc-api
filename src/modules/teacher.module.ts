import { Module } from "@nestjs/common";
import { TeacherController } from "controllers/teacher.controller";
import { TeacherService } from "services/teacher.service";
import { CachingModule } from "./cache.module";
import { ExcelReaderModule } from "./excel-reader.module";
import { QueueModule } from "./queue.module";
import { TeacherProcessor } from "processors/teacher.processor";

@Module({
    imports: [CachingModule, ExcelReaderModule, QueueModule],
    controllers: [TeacherController],
    providers: [TeacherService, TeacherProcessor],
    exports: [TeacherService]
})
export class TeacherModule {
}