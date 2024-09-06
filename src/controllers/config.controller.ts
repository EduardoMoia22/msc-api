import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfigRequestDTO, ConfigResponseDTO } from "DTOs/config.dtos";
import { Config } from "entities/config.entity";
import { AuthGuard } from "guards/auth.guard";
import { ConfigService } from "services/config.service";

@ApiBearerAuth()
@ApiTags("Configurações")
@Controller("/config")
export class ConfigController {
    constructor(private readonly configService: ConfigService
    ) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Alterar configurações' })
    @ApiResponse({ status: 200, description: 'Ok', type: ConfigResponseDTO })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    @Post()
    public async updateConfig(@Body() body: ConfigRequestDTO): Promise<ConfigResponseDTO> {
        const config: Config = await this.configService.updateConfig(body);

        return ConfigResponseDTO.fromEntity(config);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar configurações' })
    @ApiResponse({ status: 200, description: 'Ok', type: ConfigResponseDTO })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    @Get()
    public async listConfig(): Promise<ConfigResponseDTO> {
        const config: Config = await this.configService.listConfig();

        return ConfigResponseDTO.fromEntity(config);
    }
}