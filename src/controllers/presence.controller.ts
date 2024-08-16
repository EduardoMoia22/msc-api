import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Presence } from "src/entities/presence.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { createPresenceProps, PresenceService } from "src/services/presence.service";

@Controller("/presence")
export class PresenceController {
    constructor(private readonly presenceService: PresenceService) { }

    @UseGuards(AuthGuard)
    @Post()
    public async createPresence(@Body() body: createPresenceProps): Promise<Presence> {
        return await this.presenceService.createPresence(body);
    }
}