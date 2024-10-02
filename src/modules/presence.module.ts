import { Module } from "@nestjs/common";
import { PresenceController } from "src/controllers/presence.controller";
import { PresenceService } from "src/services/presence.service";
import { StudentService } from "src/services/student.service";
import { TeacherService } from "src/services/teacher.service";
import { CachingModule } from "./cache.module";
import { ConfigModule } from "./config.module";

@Module({
    imports: [CachingModule, ConfigModule],
    controllers: [PresenceController],
    providers: [PresenceService, StudentService, TeacherService]
})
export class PresenceModule {

}