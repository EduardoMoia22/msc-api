import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { createStudentProps, StudentService } from "src/services/student.service";

@Controller("/students")
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    public async createStudent(@Body() createStudentDto: createStudentProps): Promise<Student> {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get(":id")
    public async findStudentById(@Param('id') id: string): Promise<Student> {
        return await this.studentService.findStudentById(parseInt(id));
    }
}