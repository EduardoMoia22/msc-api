import { Body, Controller, Post } from "@nestjs/common";
import { PaymentMethodRequestDTO, PaymentMethodResponseDTO } from "src/DTOs/payment-methods.dtos";
import { PaymentMethod } from "src/entities/payment-method.entity";
import { PaymentMethodService } from "src/services/payment-method.service";

@Controller("payment-methods")
export class PaymentMethodController {
    constructor(
        private readonly paymentMethodService: PaymentMethodService
    ) { }

    @Post()
    public async create(@Body() body: PaymentMethodRequestDTO): Promise<PaymentMethodResponseDTO> {
        const paymentMethod: PaymentMethod = await this.paymentMethodService.create(body);

        return PaymentMethodResponseDTO.fromEntity(paymentMethod);
    }
}