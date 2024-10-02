import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar todos os professores' })
    @ApiResponse({ status: 200, description: 'Ok', type: Array<TeacherResponseDTO> })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get()
    public async findAllTeachers(): Promise<TeacherResponseDTO[]> {
        const teachers: Teacher[] = await this.teacherService.findAllTeachers();

        return Promise.all(
            teachers.map(async (teacher: Teacher) => {
                return TeacherResponseDTO.fromEntity(teacher);
            })
        );
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar professor' })
    @ApiResponse({ status: 200, description: 'Ok', type: TeacherResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Put("/:id")
    public async updateUser(@Body() body: TeacherRequestDTO, @Param("id") id: string): Promise<TeacherResponseDTO> {
        const updateTeacher: Teacher = await this.teacherService.updateTeacher(parseInt(id), body);

        return TeacherResponseDTO.fromEntity(updateTeacher);
    }

    @UseGuards(AuthGuard)
    @Post('/import/excel')
    @ApiOperation({ summary: 'Importar professores a partir de um arquivo Excel' })
    @ApiResponse({ status: 200, description: 'Arquivo importado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Bad Request. O arquivo não está no formato esperado ou contém erros.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Arquivo Excel com os dados dos professores',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', {
        dest: process.env.FILE_PATH || process.env.RAILWAY_VOLUME_MOUNT_PATH
    }))
    public async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('Arquivo não fornecido.', HttpStatus.BAD_REQUEST);
        }

        const numberOfImportedTeachers: boolean = await this.teacherService.createTeachersWithExcel(file.filename);

        return {
            message: 'Arquivo importado com sucesso.',
            numberOfImportedTeachers,
        };
    }
}