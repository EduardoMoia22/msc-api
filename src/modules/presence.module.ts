import { Module } from "@nestjs/common";
import { PresenceController } from "src/controllers/presence.controller";
import { PresenceService } from "src/services/presence.service";
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