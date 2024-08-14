import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Teacher } from "src/entities/teacher.entity";
import { createTeacherProps, TeacherService } from "src/services/teacher.service";

@Controller("/teachers")
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Post()
    public async createTeacher(@Body() createTeacherDto: createTeacherProps): Promise<Teacher> {
        return await this.teacherService.createTeacher(createTeacherDto);
    }

    @Get(":id")
    public async findTeacherById(@Param("id") id: string): Promise<Teacher> {
        return await this.teacherService.findTeacherById(parseInt(id));
    }
}