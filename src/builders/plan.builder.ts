import { Plan } from "src/entities/plan.entity";

export class PlanBuilder {
    private id: number;
    private name: string;
    private description: string;
    private price: number;
    private frequency: string;
    private createdAt: Date;
    private updatedAt: Date;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public withDescription(description: string): this {
        this.description = description;
        return this;
    }

    public withPrice(price: number): this {
        this.price = price;
        return this;
    }

    public withFrequency(frequency: string): this {
        this.frequency = frequency;
        return this;
    }

    public withCreatedAt(createdAt: Date): this {
        this.createdAt = createdAt;
        return this;
    }

    public withUpdatedAt(updatedAt: Date): this {
        this.updatedAt = updatedAt;
        return this;
    }

    public build(): Plan {
        return new Plan(
            this.id,
            this.name,
            this.description,
            this.price,
            this.frequency,
            this.createdAt,
            this.updatedAt
        );
    }
}