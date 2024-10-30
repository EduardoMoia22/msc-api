import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { PaymentMethod } from "src/entities/payment-method.entity";
import { PaymentMethodMapper } from "src/mappers/payment-method.mapper";

@Injectable()
export class PaymentMethodRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: PaymentMethod): Promise<PaymentMethod> {
        const createdPaymentMethod = await this.prisma.paymentMethod.create({
            data: PaymentMethodMapper.entityToPrisma(data)
        });

        return PaymentMethodMapper.prismaToEntity(createdPaymentMethod);
    }

    public async findById(id: number): Promise<PaymentMethod | null> {
        const paymentMethod = await this.prisma.paymentMethod.findUnique({
            where: {
                id: id
            }
        });

        if (!paymentMethod) {
            return null;
        }

        return PaymentMethodMapper.prismaToEntity(paymentMethod);
    }

    public async listAll(): Promise<PaymentMethod[]> {
        const paymentMethods = await this.prisma.paymentMethod.findMany();

        return Promise.all(
            paymentMethods.map(async (method) => {
                return PaymentMethodMapper.prismaToEntity(method);
            })
        );
    }
}
