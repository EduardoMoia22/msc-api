import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/entities/payment-method.entity';

export class PaymentMethodRequestDTO {
    @ApiProperty({
        description: 'Name of the payment method',
        example: 'Card'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class PaymentMethodResponseDTO {
    @ApiProperty({
        description: 'Unique identifier of the payment method',
    })
    id: number;

    @ApiProperty({
        description: 'Name of the payment method',
        example: 'Card'
    })
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static fromEntity(paymentMethod: PaymentMethod): PaymentMethodResponseDTO {
        return new PaymentMethodResponseDTO(
            paymentMethod.getId,
            paymentMethod.getName
        );
    }
}
