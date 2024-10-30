import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PaymentService } from './payment.service';
import { EnrollmentService } from './enrollment.service';
import { PaymentStatus } from 'src/enums/payment-status.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PaymentRequestDTO } from 'src/DTOs/payment.dtos';

@Injectable()
export class BillingService {
    constructor(
        @InjectQueue('billingQueue') private billingQueue: Queue,
        private readonly paymentService: PaymentService,
        private readonly enrollmentService: EnrollmentService
    ) { }

    @Cron('*/60 * * * * *') // Executa no primeiro dia de cada mês à meia-noite
    // Caso precise testar algo, utilize esse cront @Cron('*/30 * * * * *') que roda a cada 30 segundos
    async handleCron() {
        try {
            const enrollments = await this.enrollmentService.listAll();
            const billingPromises = enrollments.map(enrollment => this.billingQueue.add({ enrollment }));
            await Promise.all(billingPromises);
        } catch (error) {
            console.error('Error processing billing:', error);
        }
    }

    public async processBilling(enrollment: any) {
        if (enrollment.status === 'active') {
            const dueDate = this.getNextDueDate();

            // Verifica se já existe um pagamento para a matrícula e a data de vencimento
            const exists = await this.paymentService.paymentExists(enrollment.id, dueDate);

            console.log(exists)

            if (exists) {
                console.warn(`Payment for enrollment ${enrollment.id} for due date ${dueDate.toISOString()} already exists. Skipping...`);
                return; // Sai do método se o pagamento já existir
            }

            const paymentData: PaymentRequestDTO = {
                enrollmentId: enrollment.id,
                amount: enrollment.monthlyFeeNet,
                dueDate: this.getNextDueDate(),
                paymentStatus: PaymentStatus.PENDING,
                paymentMethodId: 1, // Ajustar conforme necessário
                discount: enrollment.discount || 0, // Garantir valor padrão
                lateFee: enrollment.lateFee || 0 // Garantir valor padrão
            };

            try {
                await this.paymentService.create(paymentData);
            } catch (error) {
                console.error('Error creating payment:', error);
            }
        }
    }

    private getNextDueDate(): Date {
        const nextDueDate = new Date();
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
        nextDueDate.setDate(1); // Ajusta para o primeiro dia do próximo mês
        return nextDueDate;
    }
}
