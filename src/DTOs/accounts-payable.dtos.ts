import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsDate, IsPositive, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from 'src/entities/account-status.entity';
import { AccountsPayable } from 'src/entities/accounts-payable.entity';
import { AccountCategoryResponseDTO } from './account-category.dtos';
import { Type } from 'class-transformer';


export class AccountsPayableRequestDTO {
    @ApiProperty({
        description: 'Descrição da conta a pagar',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'ID da categoria da conta',
    })
    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @ApiProperty({
        description: 'Data de vencimento da conta',
        example: '2024-01-31T00:00:00.000Z'
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // Transforma a string para uma instância de Date
    dueDate: Date;

    @ApiProperty({
        description: 'Valor estimado da conta em centavos',
        example: 100000
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    estimatedValue: number;

    @ApiProperty({
        description: 'Valor real pago (opcional) em centavos',
        example: 95000
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    actualValue?: number;

    @ApiProperty({
        description: 'Status da conta',
        example: 'paid'
    })
    @IsNotEmpty()
    @IsEnum(AccountStatus)
    status: AccountStatus;

    @ApiProperty({
        description: 'Notas adicionais sobre a conta',
    })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiProperty({
        description: 'Ativar lembrete para esta conta',
        example: true
    })
    @IsNotEmpty()
    @IsBoolean()
    reminderEnabled: boolean;

    @ApiProperty({
        description: 'Número de dias antes do vencimento para o lembrete',
        example: 3
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    reminderDaysBefore?: number;
}

export class AccountsPayableResponseDTO {
    @ApiProperty({
        description: 'ID da conta a pagar',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Descrição da conta a pagar',
    })
    description: string;

    @ApiProperty({
        description: 'Categoria da conta',
    })
    category: AccountCategoryResponseDTO;

    @ApiProperty({
        description: 'Data de vencimento da conta',
        example: '2024-01-31T00:00:00.000Z'
    })
    dueDate: Date;

    @ApiProperty({
        description: 'Valor estimado da conta em centavos',
        example: 100000
    })
    estimatedValue: number;

    @ApiProperty({
        description: 'Valor real pago (opcional) em centavos',
        example: 95000
    })
    actualValue?: number;

    @ApiProperty({
        description: 'Status da conta',
        example: 'paid'
    })
    status: AccountStatus;

    @ApiProperty({
        description: 'Notas adicionais sobre a conta',
    })
    notes?: string;

    @ApiProperty({
        description: 'Indica se o lembrete está ativo para esta conta',
        example: true
    })
    reminderEnabled: boolean;

    @ApiProperty({
        description: 'Número de dias antes do vencimento para o lembrete',
        example: 3
    })
    reminderDaysBefore?: number;

    constructor(
        id: string,
        description: string,
        category: AccountCategoryResponseDTO,
        dueDate: Date,
        estimatedValue: number,
        actualValue: number | null,
        status: AccountStatus,
        notes: string | null,
        reminderEnabled: boolean,
        reminderDaysBefore: number | null
    ) {
        this.id = id;
        this.description = description;
        this.category = category;
        this.dueDate = dueDate;
        this.estimatedValue = estimatedValue;
        this.actualValue = actualValue;
        this.status = status;
        this.notes = notes;
        this.reminderEnabled = reminderEnabled;
        this.reminderDaysBefore = reminderDaysBefore;
    }

    public static fromEntity(account: AccountsPayable): AccountsPayableResponseDTO {
        return new AccountsPayableResponseDTO(
            account.getId,
            account.getDescription,
            AccountCategoryResponseDTO.fromEntity(account.getCategory), // Transforma a categoria em DTO
            account.getDueDate,
            account.getEstimatedValue,
            account.getActualValue,
            account.getStatus,
            account.getNotes,
            account.getReminderEnabled,
            account.getReminderDaysBefore
        );
    }
}