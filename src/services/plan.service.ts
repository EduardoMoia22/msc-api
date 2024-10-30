import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PlanRequestDTO } from "src/DTOs/plan.dtos";
import { Plan } from "src/entities/plan.entity";
import { PlanMapper } from "src/mappers/plan.mapper";
import { PlanRepository } from "src/repositories/plan.repository";

@Injectable()
export class PlanService {
    constructor(private readonly planRepository: PlanRepository
    ) { }

    public async createPlan(data: PlanRequestDTO): Promise<Plan> {
        const plan: Plan = PlanMapper.dtoToEntity(data);

        return await this.planRepository.create(plan);
    }

    public async listAll(): Promise<Plan[]> {
        return await this.planRepository.listAll();
    }

    public async findById(id: number): Promise<Plan> {
        const plan: Plan | null = await this.planRepository.findById(id);

        if (!plan) {
            throw new HttpException("Plano não encontrado", HttpStatus.NOT_FOUND);
        }

        return plan;
    }
}