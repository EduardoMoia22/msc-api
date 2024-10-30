import { Plan } from "src/entities/plan.entity";
import { Plans as RawPlan } from "@prisma/client";
import { PlanRequestDTO } from "src/DTOs/plan.dtos";

export class PlanMapper {
    public static prismaToEntity(data: RawPlan): Plan {
        return Plan.Builder
            .withId(data.id)
            .withName(data.name)
            .withDescription(data.description)
            .withPrice(data.price)
            .withFrequency(data.frequency)
            .withCreatedAt(data.createdAt)
            .withUpdatedAt(data.updatedAt)
            .build();
    }

    public static entityToPrisma(data: Plan): Omit<RawPlan, "id"> {
        return {
            name: data.getName,
            description: data.getDescription,
            price: data.getPrice,
            frequency: data.getFrequency,
            createdAt: data.getCreatedAt,
            updatedAt: data.getUpdatedAt
        }
    }

    public static dtoToEntity(data: PlanRequestDTO): Plan {
        return Plan.Builder
            .withName(data.name)
            .withDescription(data.description)
            .withPrice(data.price)
            .withFrequency(data.frequency)
            .build();
    }
}