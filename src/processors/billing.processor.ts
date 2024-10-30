import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BillingService } from 'src/services/billing.service';

@Processor('billingQueue')
export class BillingProcessor {
    constructor(private readonly billingService: BillingService) { }

    @Process()
    async handleBilling(job: Job) {
        const { enrollment } = job.data;
        await this.billingService.processBilling(enrollment);
    }

    @OnQueueActive()
    onActive(job: Job<unknown>) {
        Logger.log(`Starting job ${job.id}}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job<unknown>) {
        Logger.log(`Job ${job.id} has been finished`);
    }

    @OnQueueFailed()
    onFailed(job: Job<unknown>, err: Error) {
        Logger.error(`Job ${job.id} failed: ${err.message}`, err.stack);
    }
}
