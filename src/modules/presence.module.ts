import { Module } from "@nestjs/common";
import { PresenceController } from "src/controllers/presence.controller";
import { PresenceService } from "src/services/presence.service";
import { StudentService } from "src/services/student.service";
import { TeacherService } from "src/services/teacher.service";
import { ConfigModule } from "./config.module";

@Module({
    imports: [ConfigModule],
    controllers: [PresenceController],
    providers: [PresenceService, StudentService, TeacherService]
})
export class PresenceModule {

}