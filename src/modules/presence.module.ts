import { Module } from "@nestjs/common";
import { PresenceController } from "src/controllers/presence.controller";
import { PresenceService } from "src/services/presence.service";

@Module({
    controllers: [PresenceController],
    providers: [PresenceService],
    exports: [PresenceService]
})
export class PresenceModule {}
