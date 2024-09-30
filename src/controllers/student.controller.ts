import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StudentRequestDTO, StudentResponseDTO } from "DTOs/student.dtos";
import { Student } from "entities/student.entity";
import { AuthGuard } from "guards/auth.guard";
import { StudentService } from "services/student.service";

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
    @ApiOperation({ summary: 'Buscar aluno por RM' })
    @ApiResponse({ status: 200, description: 'Ok', type: StudentResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get("rm/:rm")
    public async findStudentByRM(@Param('rm') rm: string): Promise<StudentResponseDTO> {
        const student: Student = await this.studentService.findStudentByRM(rm);

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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar aluno' })
    @ApiResponse({ status: 200, description: 'Ok', type: StudentResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Put("/:id")
    public async updateUser(@Body() body: StudentRequestDTO, @Param("id") id: string): Promise<StudentResponseDTO>{
        const updateStudent: Student = await this.studentService.updateStudent(parseInt(id), body);

        return StudentResponseDTO.fromEntity(updateStudent);
    }
}