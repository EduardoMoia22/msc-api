import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum, IsDate, IsPositive, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentStatus } from "src/enums/enrollment-status.enum";
import { Enrollment } from "src/entities/enrollment.entity";
import { StudentResponseDTO } from './student.dtos';
import { PlanResponseDto } from './plan.dtos';
import { DiscountType } from 'src/enums/discount-type.enum';

export class EnrollmentRequestDTO {
    @ApiProperty({
        description: 'ID do aluno',
    })
    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    @ApiProperty({
        description: 'ID do plano escolhido',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    planId: number;

    @ApiProperty({
        description: 'Data de início da matrícula',
        example: '2024-01-01T00:00:00.000Z'
    })
    @IsNotEmpty()
    @IsString()
    startDate: Date;

    @ApiProperty({
        description: 'Data de término da matrícula (opcional)',
        example: '2024-12-31T00:00:00.000Z'
    })
    @IsOptional()
    @IsString()
    endDate?: Date | null;

    @ApiProperty({
        description: 'Status da matrícula',
        example: 'active'
    })
    @IsNotEmpty()
    // @IsEnum(EnrollmentStatus)
    status: EnrollmentStatus;

    @ApiProperty({
        description: 'Valor da mensalidade em centavos',
        example: 50000
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    monthlyFeeGross?: number | null;

    @ApiProperty({
        description: 'Desconto em centavos (opcional)',
        example: 1000
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    discount?: number | null;

    @ApiProperty({
        description: 'Tipo de desconto (percentual ou valor fixo)',
        example: 'percentage'
    })
    @IsOptional()
    @IsString()
    @ValidateIf(o => o.discount !== null && o.discount !== 0)
    discountType?: DiscountType; // Por exemplo: 'percentage' ou 'fixed'

    @ApiProperty({
        description: 'Multa por atraso em centavos (opcional)',
        example: 500
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    lateFee?: number | null;

    @ApiProperty({
        description: 'Observações adicionais (opcional)',
        example: 'Matrícula especial para alunos veteranos'
    })
    @IsOptional()
    @IsString()
    notes?: string | null;
}

export class EnrollmentResponseDTO {
    @ApiProperty({
        description: 'UUID da matrícula',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Detalhes do aluno matriculado',
        type: StudentResponseDTO
    })
    student: StudentResponseDTO;

    @ApiProperty({
        description: 'Detalhes do plano escolhido',
        type: PlanResponseDto
    })
    plan: PlanResponseDto;

    @ApiProperty({
        description: 'Data de início da matrícula',
        example: '2024-01-01T00:00:00.000Z'
    })
    startDate: Date;

    @ApiProperty({
        description: 'Data de término da matrícula (opcional)',
        example: '2024-12-31T00:00:00.000Z'
    })
    endDate?: Date | null;

    @ApiProperty({
        description: 'Status da matrícula',
        example: 'active'
    })
    status: EnrollmentStatus;

    @ApiProperty({
        description: 'Valor da mensalidade bruto em centavos',
        example: 50000
    })
    monthlyFeeGross: number;

    @ApiProperty({
        description: 'Valor da mensalidade líquido em centavos',
        example: 50000
    })
    monthlyFeeNet: number;

    @ApiProperty({
        description: 'Desconto em centavos (opcional)',
        example: 1000
    })
    discount?: number | null;

    @ApiProperty({
        description: 'Tipo de desconto (FIXED ou PERCENTAGE)',
        example: 'FIXED'
    })
    discountType?: DiscountType | null;

    @ApiProperty({
        description: 'Multa por atraso em centavos (opcional)',
        example: 500
    })
    lateFee?: number | null;

    @ApiProperty({
        description: 'Observações adicionais (opcional)',
        example: 'Matrícula especial para alunos veteranos'
    })
    notes?: string | null;

    constructor(
        id: string,
        student: StudentResponseDTO,
        plan: PlanResponseDto,
        startDate: Date,
        endDate: Date | null,
        status: EnrollmentStatus,
        monthlyFeeGross: number,
        monthlyFeeNet: number,
        discount: number | null,
        discountType: DiscountType | null,
        lateFee: number | null,
        notes: string | null
    ) {
        this.id = id;
        this.student = student;
        this.plan = plan;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.monthlyFeeGross = monthlyFeeGross;
        this.monthlyFeeNet = monthlyFeeNet;
        this.discount = discount;
        this.discountType = discountType;
        this.lateFee = lateFee;
        this.notes = notes;
    }

    public static fromEntity(enrollment: Enrollment): EnrollmentResponseDTO {
        return new EnrollmentResponseDTO(
            enrollment.getId,
            StudentResponseDTO.fromEntity(enrollment.getStudent),  // Presume que StudentResponseDTO tenha o método fromEntity
            PlanResponseDto.fromEntity(enrollment.getPlan),  // Utiliza o método fromEntity de PlanResponseDto
            enrollment.getStartDate,
            enrollment.getEndDate,
            enrollment.getStatus,
            enrollment.getMonthlyFeeGross,
            enrollment.getMonthlyFeeNet,
            enrollment.getDiscount,
            enrollment.getDiscountType,
            enrollment.getLateFee,
            enrollment.getNotes
        );
    }
}
