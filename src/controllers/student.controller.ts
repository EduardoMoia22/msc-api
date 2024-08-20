import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StudentRequestDTO, StudentResponseDTO } from "src/DTOs/student.dtos";
import { Student } from "src/entities/student.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { StudentService } from "src/services/student.service";

@ApiBearerAuth()
@ApiTags("Aluno")
@Controller("/students")
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar aluno' })
    @ApiResponse({ status: 200, description: 'Ok', type: StudentResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async createStudent(@Body() createStudentDto: StudentRequestDTO): Promise<StudentResponseDTO> {
        const student: Student = await this.studentService.createStudent(createStudentDto);

        return StudentResponseDTO.fromEntity(student);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar aluno por ID' })
    @ApiResponse({ status: 200, description: 'Ok', type: StudentResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get(":id")
    public async findStudentById(@Param('id') id: string): Promise<StudentResponseDTO> {
        const student: Student = await this.studentService.findStudentById(parseInt(id));

        return StudentResponseDTO.fromEntity(student);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar todos os alunos' })
    @ApiResponse({ status: 200, description: 'Ok', type: StudentResponseDTO, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get()
    public async findAllStudents(): Promise<StudentResponseDTO[]> {
        const students: Student[] = await this.studentService.findAllStudents();

        return Promise.all(
            students.map(StudentResponseDTO.fromEntity)
        );
    }
}