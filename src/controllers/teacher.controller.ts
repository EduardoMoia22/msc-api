import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TeacherRequestDTO, TeacherResponseDTO } from "src/DTOs/teacher.dtos";
import { Teacher } from "src/entities/teacher.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { TeacherService } from "src/services/teacher.service";

@ApiBearerAuth()
@ApiTags("Professor")
@Controller("/teachers")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar professor' })
    @ApiResponse({ status: 200, description: 'Ok', type: TeacherResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async createTeacher(@Body() createTeacherDto: TeacherRequestDTO): Promise<TeacherResponseDTO> {
        const teacher: Teacher = await this.teacherService.createTeacher(createTeacherDto);

        return TeacherResponseDTO.fromEntity(teacher);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar professor pelo ID' })
    @ApiResponse({ status: 200, description: 'Ok', type: TeacherResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get(":id")
    public async findTeacherById(@Param("id") id: string): Promise<TeacherResponseDTO> {
        const teacher: Teacher = await this.teacherService.findTeacherById(parseInt(id));

        return TeacherResponseDTO.fromEntity(teacher);
    }
}