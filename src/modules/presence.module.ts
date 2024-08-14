import { Module } from "@nestjs/common";
import { PresenceController } from "src/controllers/presence.controller";
import { PresenceService } from "src/services/presence.service";
import { TeacherService } from "src/services/teacher.service";
import { UserService } from "src/services/user.service";

@Module({
    controllers: [PresenceController],
    providers: [PresenceService, UserService, TeacherService]
})
export class PresenceModule{

}