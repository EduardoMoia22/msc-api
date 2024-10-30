import { EnrollmentStatus } from "src/enums/enrollment-status.enum";
import { Plan } from "./plan.entity";
import { Student } from "./student.entity";
import { EnrollmentBuilder } from "src/builders/enrollment.builder";
import { DiscountType } from "src/enums/discount-type.enum";
import { HttpException, HttpStatus } from "@nestjs/common";

export class Enrollment {
    constructor(
        private readonly id: string,
        private readonly student: Student,
        private readonly plan: Plan,
        private readonly startDate: Date,
        private readonly endDate: Date | null,
        private readonly status: EnrollmentStatus,
        private monthlyFeeGross: number, // Valor da mensalidade bruto em centavos
        private monthlyFeeNet: number, // Valor da mensalidade líquido em centavos
        private discount: number | null,  // Pode ser percentual ou valor fixo
        private readonly discountType: DiscountType | null, // Tipo do desconto
        private lateFee: number | null,  // Pode ser percentual ou valor fixo
        private readonly notes: string | null,  // Observações opcionais
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) {
        this.validate();
    }

    private validate(): void {
        if (this.discount && this.discount !== 0 && !this.discountType) {
            throw new HttpException('O tipo de desconto deve ser fornecido quando um desconto for especificado.', HttpStatus.BAD_REQUEST);
        }
    }

    public calculateFinalEnrollmentFee(): void {
        let finalFee = this.monthlyFeeGross;

        if (this.discount !== null && this.discountType) {
            if (this.discountType === DiscountType.FIXED) {
                // Subtrai o desconto fixo
                finalFee -= this.discount;
            } else if (this.discountType === DiscountType.PERCENTAGE) {
                // Aplica o desconto percentual
                finalFee -= (finalFee * (this.discount / 100));
            }
        }

        if (finalFee < 0) {
            finalFee = 0;
        }

        this.monthlyFeeNet = finalFee;
    }

    public setDefaults(planPrice: number): void {
        if (!this.monthlyFeeGross) {
            this.monthlyFeeGross = planPrice;
        }

        if (!this.discount) {
            this.discount = 0;
        }

        if (!this.lateFee) {
            this.lateFee = 0;
        }
    }

    public get getId(): string {
        return this.id;
    }

    public get getStudent(): Student {
        return this.student;
    }

    public get getPlan(): Plan {
        return this.plan;
    }

    public get getStartDate(): Date {
        return this.startDate;
    }

    public get getEndDate(): Date | null {
        return this.endDate;
    }

    public get getStatus(): EnrollmentStatus {
        return this.status;
    }

    public get getMonthlyFeeGross(): number {
        return this.monthlyFeeGross;
    }

    public get getMonthlyFeeNet(): number {
        return this.monthlyFeeNet;
    }

    public get getDiscount(): number | null {
        return this.discount;
    }

    public get getDiscountType(): DiscountType | null {
        return this.discountType;
    }

    public get getLateFee(): number | null {
        return this.lateFee;
    }

    public get getNotes(): string | null {
        return this.notes;
    }

    public get getCreatedAt(): Date {
        return this.createdAt;
    }

    public get getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static get Builder(): EnrollmentBuilder {
        return new EnrollmentBuilder();
    }
}