import { Enrollment } from "src/entities/enrollment.entity";
import { Prisma, Enrollment as RawEnrollment } from "@prisma/client";
import { EnrollmentStatus } from "src/enums/enrollment-status.enum";
import { StudentMapper } from "./student.mapper";  // Mapper hipotético para Student
import { PlanMapper } from "./plan.mapper";  // Mapper existente para Plan
import { EnrollmentRequestDTO } from "src/DTOs/enrollment.dtos";
import { Student } from "src/entities/student.entity";
import { Plan } from "src/entities/plan.entity";
import { DiscountType } from "src/enums/discount-type.enum";

type EnrollmentWithStudentAndPlan = Prisma.EnrollmentGetPayload<{
    include: {
        plan: true,
        student: true
    }
}>

export class EnrollmentMapper {
    // Método para mapear do formato Prisma (RawEnrollment) para a entidade Enrollment
    public static prismaToEntity(data: EnrollmentWithStudentAndPlan): Enrollment {
        return Enrollment.Builder
            .withId(data.id)
            .withStudent(StudentMapper.prismaToEntity(data.student))  // Considerando um mapeador para o Student
            .withPlan(PlanMapper.prismaToEntity(data.plan))  // Utilizando o mapeador existente para Plan
            .withStartDate(data.startDate)
            .withEndDate(data.endDate)
            .withStatus(data.status as EnrollmentStatus)
            .withMonthlyFeeGross(data.monthlyFeeGross)
            .withMonthlyFeeNet(data.monthlyFeeNet)
            .withDiscount(data.discount)
            .withDiscountType(data.discountType as DiscountType)
            .withLateFee(data.lateFee)
            .withNotes(data.notes)
            .withCreatedAt(data.createdAt)
            .withUpdatedAt(data.updatedAt)
            .build();
    }

    // Método para mapear da entidade Enrollment para o formato Prisma (RawEnrollment)
    public static entityToPrisma(data: Enrollment): Omit<RawEnrollment, "id"> {
        return {
            studentId: data.getStudent.getId,
            planId: data.getPlan.getId,
            startDate: data.getStartDate,
            endDate: data.getEndDate,
            status: this.mapStatusToPrisma(data.getStatus),  // Faz o mapeamento correto do status
            discountType: this.mapDiscountTypeToPrisma(data.getDiscountType), // Faz o mapeamento correto do tipo de desconto
            monthlyFeeGross: data.getMonthlyFeeGross,
            monthlyFeeNet: data.getMonthlyFeeNet,
            discount: data.getDiscount,
            lateFee: data.getLateFee,
            notes: data.getNotes,
            createdAt: data.getCreatedAt,
            updatedAt: data.getUpdatedAt
        };
    }

    private static mapStatusToPrisma(status: EnrollmentStatus): RawEnrollment["status"] {
        switch (status) {
            case EnrollmentStatus.ACTIVE:
                return "active";
            case EnrollmentStatus.INACTIVE:
                return "inactive";
            case EnrollmentStatus.CANCELED:
                return "canceled";
            default:
                throw new Error(`Status de matrícula desconhecido: ${status}`);
        }
    }

    private static mapDiscountTypeToPrisma(discountType: DiscountType): RawEnrollment["discountType"] {
        switch (discountType) {
            case DiscountType.FIXED:
                return "FIXED";
            case DiscountType.PERCENTAGE:
                return "PERCENTAGE";
        }
    }

    public static dtoToEntity(dto: EnrollmentRequestDTO, student: Student, plan: Plan): Enrollment {
        return Enrollment.Builder
            .withStudent(student)
            .withPlan(plan)
            .withStartDate(new Date(dto.startDate))
            .withEndDate(dto.endDate ? new Date(dto.endDate) : null)
            .withStatus(EnrollmentStatus[dto.status.toUpperCase() as keyof typeof EnrollmentStatus])  // Converte string para enum
            .withMonthlyFeeGross(dto.monthlyFeeGross)
            .withDiscount(dto.discount ?? null)
            .withDiscountType(dto.discountType)
            .withLateFee(dto.lateFee ?? null)
            .withNotes(dto.notes ?? null)
            .build();
    }
}
