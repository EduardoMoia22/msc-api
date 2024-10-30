import { Module } from "@nestjs/common";
import { PlanController } from "src/controllers/plan.controller";
import { PlanService } from "src/services/plan.service";

@Module({
    controllers: [PlanController],
    providers: [PlanService],
    exports: [PlanService]
})
export class PlanModule {

}