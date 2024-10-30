import { Injectable } from "@nestjs/common";
import { PaymentRequestDTO } from "src/DTOs/payment.dtos";
import { Payment } from "src/entities/payment.entity";
import { PaymentMapper } from "src/mappers/payment.mapper";
import { PaymentRepository } from "src/repositories/payment.repository";
import { EnrollmentService } from "./enrollment.service";
import { Enrollment } from "src/entities/enrollment.entity";
import { PaymentMethodService } from "./payment-method.service";
import { PaymentMethod } from "src/entities/payment-method.entity";

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly paymentMethodService: PaymentMethodService,
        private readonly enrollmentService: EnrollmentService
    ) { }

    public async create(data: PaymentRequestDTO): Promise<Payment> {
        const enrollment: Enrollment = await this.enrollmentService.findById(data.enrollmentId);
        const paymentMethod: PaymentMethod = await this.paymentMethodService.findById(data.paymentMethodId);

        const payment: Payment = PaymentMapper.dtoToEntity(data, enrollment, paymentMethod);

        return await this.paymentRepository.create(payment);
    }

    public async paymentExists(enrollmentId: string, dueDate: Date): Promise<Payment> {
        const existingPayment: Payment | null = await this.paymentRepository.findPaymentByEnrollmentIdAndDueDate(enrollmentId, dueDate);

        return existingPayment;
    }
}