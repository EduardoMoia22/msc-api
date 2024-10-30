import { Body, Controller, Post } from "@nestjs/common";
import { EnrollmentRequestDTO, EnrollmentResponseDTO } from "src/DTOs/enrollment.dtos";
import { Enrollment } from "src/entities/enrollment.entity";
import { EnrollmentService } from "src/services/enrollment.service";

@Controller("enrollments")
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) { }

    @Post()
    public async create(@Body() body: EnrollmentRequestDTO): Promise<EnrollmentResponseDTO> {
        const enrollment: Enrollment = await this.enrollmentService.create(body);

        return EnrollmentResponseDTO.fromEntity(enrollment);
    }
}