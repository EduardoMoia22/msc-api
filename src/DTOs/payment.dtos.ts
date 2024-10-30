import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsDate, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from "src/enums/payment-status.enum";
import { Payment } from 'src/entities/payment.entity';
import { EnrollmentResponseDTO } from './enrollment.dtos';
import { PaymentMethodResponseDTO } from './payment-methods.dtos';
import { Enrollment } from 'src/entities/enrollment.entity';
import { PaymentMethod } from 'src/entities/payment-method.entity';

export class PaymentRequestDTO {
    @ApiProperty({
        description: 'ID da matrícula associada',
    })
    @IsNotEmpty()
    @IsString()
    enrollmentId: string;

    @ApiProperty({
        description: 'Valor do pagamento em centavos',
        example: 50000
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({
        description: 'Data do pagamento',
        example: '2024-01-01T00:00:00.000Z'
    })
    @IsOptional()
    @IsString()
    paymentDate?: Date | null;

    @ApiProperty({
        description: 'Data de vencimento',
        example: '2024-01-31T00:00:00.000Z'
    })
    @IsNotEmpty()
    @IsString()
    dueDate: Date;

    @ApiProperty({
        description: 'Status do pagamento',
        example: 'paid'
    })
    @IsNotEmpty()
    // @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;

    @ApiProperty({
        description: 'ID do método de pagamento',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;

    @ApiProperty({
        description: 'Desconto aplicado (opcional) em centavos',
        example: 1000
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    discount?: number | null;

    @ApiProperty({
        description: 'Multa aplicada (opcional) em centavos',
        example: 500
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    lateFee?: number | null;
}

export class PaymentResponseDTO {
    @ApiProperty({
        description: 'ID do pagamento',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Detalhes da matrícula associada',
    })
    enrollment: EnrollmentResponseDTO;

    @ApiProperty({
        description: 'Valor do pagamento em centavos',
        example: 50000
    })
    amount: number;

    @ApiProperty({
        description: 'Data do pagamento',
        example: '2024-01-01T00:00:00.000Z'
    })
    paymentDate?: Date | null;

    @ApiProperty({
        description: 'Data de vencimento',
        example: '2024-01-31T00:00:00.000Z'
    })
    dueDate: Date;

    @ApiProperty({
        description: 'Status do pagamento',
        example: 'paid'
    })
    paymentStatus: PaymentStatus;

    @ApiProperty({
        description: 'Detalhes da forma de pagamento escolhida',
    })
    paymentMethod: PaymentMethodResponseDTO;

    @ApiProperty({
        description: 'Desconto aplicado (opcional) em centavos',
        example: 1000
    })
    discount?: number | null;

    @ApiProperty({
        description: 'Multa aplicada (opcional) em centavos',
        example: 500
    })
    lateFee?: number | null;

    constructor(
        id: string,
        enrollment: Enrollment,
        amount: number,
        paymentDate: Date | null,
        dueDate: Date,
        paymentStatus: PaymentStatus,
        paymentMethod: PaymentMethod,
        discount: number | null,
        lateFee: number | null,
    ) {
        this.id = id;
        this.enrollment = EnrollmentResponseDTO.fromEntity(enrollment);
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.dueDate = dueDate;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = PaymentMethodResponseDTO.fromEntity(paymentMethod);
        this.discount = discount;
        this.lateFee = lateFee;
    }

    public static fromEntity(payment: Payment): PaymentResponseDTO {
        return new PaymentResponseDTO(
            payment.getId,
            payment.getEnrollment,
            payment.getAmount,
            payment.getPaymentDate,
            payment.getDueDate,
            payment.getPaymentStatus,
            payment.getPaymentMethod,
            payment.getDiscount,
            payment.getLateFee
        );
    }
}
