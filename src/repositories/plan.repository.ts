import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Plan } from "src/entities/plan.entity";
import { PlanMapper } from "src/mappers/plan.mapper";

@Injectable()
export class PlanRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: Plan): Promise<Plan> {
        const createPlan = await this.prisma.plans.create({
            data: PlanMapper.entityToPrisma(data)
        });

        return PlanMapper.prismaToEntity(createPlan);
    }

    public async findById(id: number): Promise<Plan | null> {
        const plan = await this.prisma.plans.findUnique({
            where: {
                id: id
            }
        });

        if (!plan) {
            return null;
        }

        return PlanMapper.prismaToEntity(plan);
    }

    public async listAll(): Promise<Plan[]> {
        const plans = await this.prisma.plans.findMany();

        return Promise.all(
            plans.map(async (plan) => {
                return PlanMapper.prismaToEntity(plan);
            })
        );
    }
}