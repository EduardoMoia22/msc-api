import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Payment } from "src/entities/payment.entity";
import { PaymentMapper } from "src/mappers/payment.mapper";

@Injectable()
export class PaymentRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: Payment): Promise<Payment> {
        const createPayment = await this.prisma.payment.create({
            data: PaymentMapper.entityToPrisma(data),
            include: {
                enrollment: {
                    include: {
                        plan: true,
                        student: true
                    }
                },
                paymentMethod: true,
            }
        });

        return PaymentMapper.prismaToEntity(createPayment);
    }

    public async listAll(): Promise<Payment[]> {
        const payments = await this.prisma.payment.findMany({
            include: {
                enrollment: {
                    include: {
                        plan: true,
                        student: true
                    }
                },
                paymentMethod: true,
            }
        });

        return await Promise.all(
            payments.map((payment) => {
                return PaymentMapper.prismaToEntity(payment);
            })
        );
    }

    public async findById(id: string): Promise<Payment | null> {
        const payment = await this.prisma.payment.findUnique({
            where: {
                id: id
            },
            include: {
                enrollment: {
                    include: {
                        plan: true,
                        student: true
                    }
                },
                paymentMethod: true,
            }
        });

        return payment ? PaymentMapper.prismaToEntity(payment) : null;
    }

    public async findPaymentByEnrollmentIdAndDueDate(enrollmentId: string, dueDate: Date): Promise<Payment | null> {
        const year = dueDate.getFullYear();
        const month = dueDate.getMonth();

        const existingPayment = await this.prisma.payment.findFirst({
            where: {
                enrollmentId,
                paymentStatus: 'pending', // Ou o status que você estiver usando
                // Use o Prisma para fazer a comparação de ano e mês na data
                AND: [
                    {
                        dueDate: {
                            gte: new Date(year, month, 1), // Data do primeiro dia do mês
                        }
                    },
                    {
                        dueDate: {
                            lt: new Date(year, month + 1, 1) // Data do primeiro dia do próximo mês
                        }
                    }
                ]
            },
            include: {
                enrollment: {
                    include: {
                        plan: true,
                        student: true
                    }
                },
                paymentMethod: true,
            }
        });

        return existingPayment ? PaymentMapper.prismaToEntity(existingPayment) : null;
    }
}
