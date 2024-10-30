import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaymentMethodRequestDTO } from "src/DTOs/payment-methods.dtos";
import { PaymentMethod } from "src/entities/payment-method.entity";
import { PaymentMethodMapper } from "src/mappers/payment-method.mapper";
import { PaymentMethodRepository } from "src/repositories/payment-method.repository";

@Injectable()
export class PaymentMethodService {
    constructor(
        private readonly paymentMethodRepository: PaymentMethodRepository
    ) { }

    public async create(data: PaymentMethodRequestDTO): Promise<PaymentMethod> {
        const paymentMethod: PaymentMethod = PaymentMethodMapper.dtoToEntity(data);

        return await this.paymentMethodRepository.create(paymentMethod);
    }

    public async findById(id: number): Promise<PaymentMethod> {
        const paymentMethod: PaymentMethod | null = await this.paymentMethodRepository.findById(id);

        if (!paymentMethod) {
            throw new HttpException("Forma de pagamento não encontrada.", HttpStatus.NOT_FOUND);
        }

        return paymentMethod;
    }

    public async listAll(): Promise<PaymentMethod[]> {
        return await this.paymentMethodRepository.listAll();
    }
}