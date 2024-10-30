import { PaymentStatus } from "src/enums/payment-status.enum";
import { Enrollment } from "./enrollment.entity";
import { PaymentMethod } from "./payment-method.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { PaymentBuilder } from "src/builders/payment.builder";
import { Utils } from "src/tools/utils.tool";

export class Payment {
    constructor(
        private readonly id: string,
        private readonly enrollment: Enrollment,
        private readonly amount: number, // Assuming this is in cents
        private readonly paymentDate: Date | null,
        private readonly dueDate: Date,
        private readonly paymentStatus: PaymentStatus,
        private readonly paymentMethod: PaymentMethod,
        private readonly discount: number | null, // Optional discount in cents
        private readonly lateFee: number | null // Optional late fee in cents
    ) {
        this.validate();
    }

    private validate(): void {
        // Ensure the payment amount is not negative
        if (this.amount < 0) {
            throw new HttpException('The payment amount cannot be negative.', HttpStatus.BAD_REQUEST);
        }

        // Ensure due date is in the future
        if (this.dueDate < Utils.getCurrentGMTDateTime()) {
            throw new HttpException('The due date cannot be in the past.', HttpStatus.BAD_REQUEST);
        }
    }

    public get getId(): string {
        return this.id;
    }

    public get getEnrollment(): Enrollment {
        return this.enrollment;
    }

    public get getAmount(): number {
        return this.amount;
    }

    public get getPaymentDate(): Date | null {
        return this.paymentDate;
    }

    public get getDueDate(): Date {
        return this.dueDate;
    }

    public get getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }

    public get getPaymentMethod(): PaymentMethod {
        return this.paymentMethod;
    }

    public get getDiscount(): number | null {
        return this.discount;
    }

    public get getLateFee(): number | null {
        return this.lateFee;
    }

    public static get Builder(): PaymentBuilder {
        return new PaymentBuilder();
    }
}
