import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { PaymentModule } from "./payment.module";
import { EnrollmentModule } from "./enrollment.module";
import { BillingService } from "src/services/billing.service";
import { QueueModule } from "./queue.module";
import { BillingProcessor } from "src/processors/billing.processor";

@Module({
    imports: [ScheduleModule.forRoot(), PaymentModule, EnrollmentModule, QueueModule],
    providers: [BillingService, BillingProcessor],
})
export class BillingModule { }