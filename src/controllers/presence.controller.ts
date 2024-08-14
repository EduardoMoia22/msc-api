import { Body, Controller, Post } from "@nestjs/common";
import { Presence } from "src/entities/presence.entity";
import { createPresenceProps, PresenceService } from "src/services/presence.service";

@Controller("/presence")
export class PresenceController {
    constructor(private readonly presenceService: PresenceService) { }

    @Post()
    public async createPresence(@Body() body: createPresenceProps): Promise<Presence> {
        return await this.presenceService.createPresence(body);
    }
}