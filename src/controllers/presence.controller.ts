import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PresenceRequestDTO, PresenceResponseDTO } from "DTOs/presence.dtos";
import { Presence } from "entities/presence.entity";
import { AuthGuard } from "guards/auth.guard";
import { PresenceService } from "services/presence.service";

@ApiBearerAuth()
@ApiTags("Presença")
@Controller("/presence")
export class PresenceController {
    constructor(private readonly presenceService: PresenceService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Lançar presença' })
    @ApiResponse({ status: 200, description: 'Ok', type: PresenceResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async createPresence(@Body() body: PresenceRequestDTO): Promise<PresenceResponseDTO> {
        const presence: Presence = await this.presenceService.createPresence(body);

        return PresenceResponseDTO.fromEntity(presence);
    }
}