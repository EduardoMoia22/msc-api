import { Enrollment } from "src/entities/enrollment.entity";
import { EnrollmentStatus } from "src/enums/enrollment-status.enum";
import { Plan } from "src/entities/plan.entity";
import { Student } from "src/entities/student.entity";
import { DiscountType } from "src/enums/discount-type.enum";

export class EnrollmentBuilder {
    private id: string;
    private student: Student;
    private plan: Plan;
    private startDate: Date;
    private endDate: Date | null = null; // Valor padrão como null, já que é opcional
    private status: EnrollmentStatus;
    private monthlyFeeGross: number; // Valor da mensalidade bruto em centavos
    private monthlyFeeNet: number; // Valor da mensalidade líquido em centavos
    private discount: number | null = null; // Valor padrão como null, pois pode ser opcional
    private discountType: DiscountType | null = null;
    private lateFee: number | null = null; // Valor padrão como null, pois pode ser opcional
    private notes: string | null = null; // Valor padrão como null, pois é opcional
    private createdAt: Date;
    private updatedAt: Date;

    public withId(id: string): this {
        this.id = id;
        return this;
    }

    public withStudent(student: Student): this {
        this.student = student;
        return this;
    }

    public withPlan(plan: Plan): this {
        this.plan = plan;
        return this;
    }

    public withStartDate(startDate: Date): this {
        this.startDate = startDate;
        return this;
    }

    public withEndDate(endDate: Date | null): this {
        this.endDate = endDate;
        return this;
    }

    public withStatus(status: EnrollmentStatus): this {
        this.status = status;
        return this;
    }

    public withMonthlyFeeGross(monthlyFeeGross: number): this {
        this.monthlyFeeGross = monthlyFeeGross;
        return this;
    }

    public withMonthlyFeeNet(monthlyFeeNet: number): this {
        this.monthlyFeeNet = monthlyFeeNet;
        return this;
    }

    public withDiscount(discount: number | null): this {
        this.discount = discount;
        return this;
    }

    public withDiscountType(discountType: DiscountType): this {
        this.discountType = discountType;
        return this;
    }

    public withLateFee(lateFee: number | null): this {
        this.lateFee = lateFee;
        return this;
    }

    public withNotes(notes: string | null): this {
        this.notes = notes;
        return this;
    }

    public withCreatedAt(createdAt: Date): this {
        this.createdAt = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): this {
        this.updatedAt = updatedAt;
        return this;
    }

    public build(): Enrollment {
        return new Enrollment(
            this.id,
            this.student,
            this.plan,
            this.startDate,
            this.endDate,
            this.status,
            this.monthlyFeeGross,
            this.monthlyFeeNet,
            this.discount,
            this.discountType,
            this.lateFee,
            this.notes,
            this.createdAt,
            this.updatedAt
        );
    }
}
