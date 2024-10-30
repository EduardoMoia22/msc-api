import { PaymentMethod } from "src/entities/payment-method.entity";

export class PaymentMethodBuilder {
    private id: number;
    private name: string;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public build(): PaymentMethod {
        return new PaymentMethod(
            this.id,
            this.name
        );
    }
}