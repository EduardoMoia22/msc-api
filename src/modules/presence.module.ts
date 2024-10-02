import { Module } from "@nestjs/common";
import { PresenceController } from "controllers/presence.controller";
import { PresenceService } from "services/presence.service";
import { StudentService } from "services/student.service";
import { TeacherService } from "services/teacher.service";
import { CachingModule } from "./cache.module";
import { ConfigModule } from "./config.module";
import { ExcelReaderModule } from "./excel-reader.module";
import { StudentModule } from "./student.module";
import { TeacherModule } from "./teacher.module";

@Module({
    imports: [CachingModule, ConfigModule, ExcelReaderModule, StudentModule, TeacherModule],
    controllers: [PresenceController],
    providers: [PresenceService]
})
export class PresenceModule {

}