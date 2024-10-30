import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Enrollment } from "src/entities/enrollment.entity";
import { EnrollmentMapper } from "src/mappers/enrollment.mapper";

@Injectable()
export class EnrollmentRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: Enrollment): Promise<Enrollment> {
        const createEnrollment = await this.prisma.enrollment.create({
            data: EnrollmentMapper.entityToPrisma(data),
            include: {
                plan: true,
                student: true
            }
        });

        return EnrollmentMapper.prismaToEntity(createEnrollment);
    }

    public async listAll(): Promise<Enrollment[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            include: {
                plan: true,
                student: true
            }
        });

        return await Promise.all(
            enrollments.map((enrollment) => {
                return EnrollmentMapper.prismaToEntity(enrollment)
            })
        );
    }

    public async findById(id: string): Promise<Enrollment | null> {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                id: id
            },
            include: {
                plan: true,
                student: true
            }
        });

        return EnrollmentMapper.prismaToEntity(enrollment);
    }
}