import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PlanRequestDTO, PlanResponseDto } from "src/DTOs/plan.dtos";
import { Plan } from "src/entities/plan.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { PlanService } from "src/services/plan.service";

@Controller("plans")
export class PlanController {
    constructor(private readonly planService: PlanService) { }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar plano' })
    @ApiResponse({ status: 200, description: 'Ok', type: PlanResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async create(@Body() body: PlanRequestDTO): Promise<PlanResponseDto> {
        const plan: Plan = await this.planService.createPlan(body);

        return PlanResponseDto.fromEntity(plan);
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar todos os planos' })
    @ApiResponse({ status: 200, description: 'Ok', type: PlanResponseDto, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get()
    public async listAll(): Promise<PlanResponseDto[]> {
        const plans: Plan[] = await this.planService.listAll();

        return Promise.all(
            plans.map(PlanResponseDto.fromEntity)
        );
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar um plano pelo id' })
    @ApiResponse({ status: 200, description: 'Ok', type: PlanResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get("/id")
    public async findById(@Param("id") id: string): Promise<PlanResponseDto> {
        const plan: Plan = await this.planService.findById(parseInt(id));

        return PlanResponseDto.fromEntity(plan);
    }
}