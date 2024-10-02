import { Module } from "@nestjs/common";
import { ConfigController } from "src/controllers/config.controller";
import { ConfigService } from "src/services/config.service";
import { CachingModule } from "./cache.module";

@Module({
    imports: [CachingModule],
    providers: [ConfigService],
    controllers: [ConfigController],
    exports: [ConfigService]
})
export class ConfigModule { }