import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ClassRequestDTO, ClassResponseDTO } from "src/DTOs/class.dtos";
import { Class } from "src/entities/class.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { ClassService } from "src/services/class.service";

@ApiBearerAuth()
@Controller('/class')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar aluno' })
    @ApiResponse({ status: 200, description: 'Ok', type: ClassResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async createClass(@Body() body: ClassRequestDTO): Promise<ClassResponseDTO> {
        const classEntity: Class = await this.classService.createClass(body);

        return ClassResponseDTO.fromEntity(classEntity);
    }
}