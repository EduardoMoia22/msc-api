import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PresenceRequestDTO, PresenceResponseDTO } from "src/DTOs/presence.dtos";
import { Presence } from "src/entities/presence.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { PresenceService } from "src/services/presence.service";

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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar presenças, contendo alguns filtros opcionais' })
    @ApiResponse({ status: 200, description: 'Ok', type: PresenceResponseDTO, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @ApiQuery({ name: 'studentId', required: false, type: String, description: 'Id do aluno' })
    @ApiQuery({ name: 'teacherId', required: false, type: String, description: 'Id do professor' })
    @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Data inicial para o filtro (formato YYYY-MM-DD)' })
    @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Data final para o filtro (formato YYYY-MM-DD)' })
    @Get()
    public async listPresences(
        @Query("studentId") studentId?: string,
        @Query("teacherId") teacherId?: string,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string
    ): Promise<PresenceResponseDTO[]> {
        const presences: Presence[] = await this.presenceService.listPresences(
            parseInt(studentId),
            parseInt(teacherId),
            startDate,
            endDate);

        return presences.map(PresenceResponseDTO.fromEntity);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar presença pelo id' })
    @ApiResponse({ status: 200, description: 'Ok', type: PresenceResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get(":id")
    public async findById(
        @Param('id') id: string
    ): Promise<PresenceResponseDTO> {
        const presence: Presence = await this.presenceService.findById(parseInt(id));

        return PresenceResponseDTO.fromEntity(presence);
    }
}