import { PaymentMethodBuilder } from "src/builders/payment-method.builder";

export class PaymentMethod {
    constructor(
        private readonly id: number,
        private readonly name: string,
    ) { }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public static get Builder(): PaymentMethodBuilder {
        return new PaymentMethodBuilder();
    }
}