import { Module } from "@nestjs/common";
import { PaymentMethodController } from "src/controllers/payment-method.controller";
import { PaymentMethodService } from "src/services/payment-method.service";

@Module({
    controllers: [PaymentMethodController],
    providers: [PaymentMethodService],
    exports: [PaymentMethodService]
})
export class PaymentMethodModule { }