import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { createStudentProps, StudentService } from "src/services/student.service";

@Controller("/students")
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @UseGuards(AuthGuard)
    @Post()
    public async createStudent(@Body() createStudentDto: createStudentProps): Promise<Student> {
        return this.studentService.createStudent(createStudentDto);
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    public async findStudentById(@Param('id') id: string): Promise<Student> {
        return await this.studentService.findStudentById(parseInt(id));
    }
}