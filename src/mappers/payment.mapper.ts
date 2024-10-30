import { Payment } from "src/entities/payment.entity";
import { Prisma, Payment as RawPayment } from "@prisma/client";
import { PaymentRequestDTO, PaymentResponseDTO } from "src/DTOs/payment.dtos";
import { EnrollmentMapper } from "./enrollment.mapper";
import { PaymentStatus } from "src/enums/payment-status.enum";
import { PaymentMethodMapper } from "./payment-method.mapper";
import { Enrollment } from "src/entities/enrollment.entity";
import { PaymentMethod } from "src/entities/payment-method.entity";

type PaymentWithEnrollmentAndPaymentMethod = Prisma.PaymentGetPayload<{
    include: {
        enrollment: {
            include: {
                plan: true,
                student: true
            }
        },
        paymentMethod: true
    }
}>

export class PaymentMapper {
    public static prismaToEntity(data: PaymentWithEnrollmentAndPaymentMethod): Payment {
        return Payment.Builder
            .withId(data.id)
            .withEnrollment(EnrollmentMapper.prismaToEntity(data.enrollment))
            .withAmount(data.amount)
            .withPaymentDate(data.paymentDate)
            .withDueDate(data.dueDate)
            .withPaymentStatus(data.paymentStatus as PaymentStatus)
            .withPaymentMethod(PaymentMethodMapper.prismaToEntity(data.paymentMethod))
            .withDiscount(data.discount)
            .withLateFee(data.lateFee)
            .build();
    }

    public static entityToPrisma(data: Payment): Omit<RawPayment, "id"> {
        console.log("entityprisma: ",{
            enrollmentId: data.getEnrollment.getId,
            amount: data.getAmount,
            paymentDate: data.getPaymentDate,
            dueDate: data.getDueDate,
            paymentStatus: this.mapPaymentStatusToPrisma(data.getPaymentStatus),
            paymentMethodId: data.getPaymentMethod.getId,
            discount: data.getDiscount,
            lateFee: data.getLateFee
        })
        
        return {
            enrollmentId: data.getEnrollment.getId,
            amount: data.getAmount,
            paymentDate: data.getPaymentDate,
            dueDate: data.getDueDate,
            paymentStatus: this.mapPaymentStatusToPrisma(data.getPaymentStatus),
            paymentMethodId: data.getPaymentMethod.getId,
            discount: data.getDiscount,
            lateFee: data.getLateFee
        };
    }

    public static mapPaymentStatusToPrisma(paymentStatus: PaymentStatus): RawPayment["paymentStatus"] {
        switch (paymentStatus) {
            case PaymentStatus.PENDING:
                return "pending";
            case PaymentStatus.OVERDUE:
                return "overdue";
            case PaymentStatus.PAID:
                return "paid";
            default:
                throw new Error(`Status de matrícula desconhecido: ${paymentStatus}`);
        }
    }

    public static dtoToEntity(data: PaymentRequestDTO, enrollment: Enrollment, paymentMethod: PaymentMethod): Payment {
        return Payment.Builder
            .withEnrollment(enrollment)
            .withAmount(data.amount)
            .withPaymentDate(data.paymentDate)
            .withDueDate(data.dueDate)
            .withPaymentStatus(data.paymentStatus)  // Converte string para enum
            .withPaymentMethod(paymentMethod)
            .withDiscount(data.discount)
            .withLateFee(data.lateFee)
            .build();
    }
}
