import { Module } from "@nestjs/common";
import { PaymentController } from "src/controllers/payment-controller";
import { PaymentService } from "src/services/payment.service";
import { EnrollmentModule } from "./enrollment.module";
import { PaymentMethodModule } from "./payment-method.module";

@Module({
    imports: [EnrollmentModule, PaymentMethodModule],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService]
})
export class PaymentModule { }