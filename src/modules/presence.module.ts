import { Module } from "@nestjs/common";
import { PresenceController } from "controllers/presence.controller";
import { PresenceService } from "services/presence.service";
import { StudentService } from "services/student.service";
import { TeacherService } from "services/teacher.service";
import { ConfigModule } from "./config.module";

@Module({
    imports: [ConfigModule],
    controllers: [PresenceController],
    providers: [PresenceService, StudentService, TeacherService]
})
export class PresenceModule {

}