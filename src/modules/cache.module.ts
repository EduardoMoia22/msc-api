import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { CacheService } from "src/services/cache.service";

@Module({
    imports: [CacheModule.register()],
    providers: [CacheService],
    exports: [CacheService]
})
export class CachingModule { }