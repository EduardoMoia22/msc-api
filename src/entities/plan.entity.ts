import { PlanBuilder } from "src/builders/plan.builder";

export class Plan {
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly description: string,
        private readonly price: number,
        private readonly frequency: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) { }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getDescription(): string {
        return this.description;
    }

    public get getPrice(): number {
        return this.price;
    }

    public get getFrequency(): string {
        return this.frequency;
    }

    public get getCreatedAt(): Date {
        return this.createdAt;
    }

    public get getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static get Builder(): PlanBuilder {
        return new PlanBuilder();
    }
}