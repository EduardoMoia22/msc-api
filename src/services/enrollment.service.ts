import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EnrollmentRequestDTO } from "src/DTOs/enrollment.dtos";
import { Enrollment } from "src/entities/enrollment.entity";
import { Student } from "src/entities/student.entity";
import { EnrollmentRepository } from "src/repositories/enrollment.repository";
import { StudentService } from "./student.service";
import { PlanService } from "./plan.service";
import { Plan } from "src/entities/plan.entity";
import { EnrollmentMapper } from "src/mappers/enrollment.mapper";

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
        private readonly studentService: StudentService,
        private readonly planService: PlanService
    ) { }

    public async create(data: EnrollmentRequestDTO): Promise<Enrollment> {
        const student: Student = await this.studentService.findStudentById(data.studentId);
        const plan: Plan = await this.planService.findById(data.planId);

        const enrollment: Enrollment = EnrollmentMapper.dtoToEntity(data, student, plan);

        enrollment.setDefaults(plan.getPrice);

        enrollment.calculateFinalEnrollmentFee();

        return await this.enrollmentRepository.create(enrollment);
    }

    public async findById(id: string): Promise<Enrollment> {
        const enrollment: Enrollment | null = await this.enrollmentRepository.findById(id);

        if (!enrollment) {
            throw new HttpException("Matrícula não encontrada.", HttpStatus.NOT_FOUND);
        }

        return enrollment;
    }

    public async listAll(): Promise<Enrollment[]> {
        return await this.enrollmentRepository.listAll();
    }
}