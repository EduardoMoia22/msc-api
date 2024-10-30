import { Body, Controller, Post } from "@nestjs/common";
import { PaymentRequestDTO, PaymentResponseDTO } from "src/DTOs/payment.dtos";
import { Payment } from "src/entities/payment.entity";
import { PaymentService } from "src/services/payment.service";

@Controller("payment")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    public async create(@Body() body: PaymentRequestDTO): Promise<PaymentResponseDTO> {
        const payment: Payment = await this.paymentService.create(body);
        return PaymentResponseDTO.fromEntity(payment);
    }
}