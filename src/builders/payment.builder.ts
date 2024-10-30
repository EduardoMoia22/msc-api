import { Enrollment } from "src/entities/enrollment.entity";
import { PaymentMethod } from "src/entities/payment-method.entity";
import { Payment } from "src/entities/payment.entity";
import { PaymentStatus } from "src/enums/payment-status.enum";

export class PaymentBuilder {
    private id: string;
    private enrollment: Enrollment;
    private amount: number;
    private paymentDate: Date | null;
    private dueDate: Date;
    private paymentStatus: PaymentStatus;
    private paymentMethod: PaymentMethod;
    private discount: number | null;
    private lateFee: number | null;

    public withId(id: string): this {
        this.id = id;
        return this;
    }

    public withEnrollment(enrollment: Enrollment): this {
        this.enrollment = enrollment;
        return this;
    }

    public withAmount(amount: number): this {
        this.amount = amount;
        return this;
    }

    public withPaymentDate(paymentDate: Date): this {
        this.paymentDate = paymentDate;
        return this;
    }

    public withDueDate(dueDate: Date): this {
        this.dueDate = dueDate;
        return this;
    }

    public withPaymentStatus(paymentStatus: PaymentStatus): this {
        this.paymentStatus = paymentStatus;
        return this;
    }

    public withPaymentMethod(paymentMethod: PaymentMethod): this {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public withDiscount(discount?: number): this {
        this.discount = discount;
        return this;
    }

    public withLateFee(lateFee?: number): this {
        this.lateFee = lateFee;
        return this;
    }

    public build(): Payment {
        return new Payment(
            this.id,
            this.enrollment,
            this.amount,
            this.paymentDate,
            this.dueDate,
            this.paymentStatus,
            this.paymentMethod,
            this.discount,
            this.lateFee
        );
    }
}
