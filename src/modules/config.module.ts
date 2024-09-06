import { Module } from "@nestjs/common";
import { ConfigController } from "controllers/config.controller";
import { ConfigService } from "services/config.service";

@Module({
    providers: [ConfigService],
    controllers: [ConfigController],
    exports: [ConfigService]
})
export class ConfigModule { }