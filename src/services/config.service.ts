import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigRequestDTO } from "src/DTOs/config.dtos";
import { Config } from "src/entities/config.entity";
import { ConfigRepository } from "src/repositories/config.repository";
import { CacheService } from "./cache.service";

@Injectable()
export class ConfigService implements OnModuleInit {
    private readonly CONFIG_LIST_CACHE_KEY = this.cacheService.generateListCacheKey('configs');
    private readonly CACHE_TTL = 3600000;

    constructor(
        private readonly configRepository: ConfigRepository,
        private readonly cacheService: CacheService
    ) { }

    public async onModuleInit() {
        await this.handleInitialConfig();
    }

    public async handleInitialConfig(): Promise<Boolean> {
        const configExists: Config | null = await this.findConfig();

        if (configExists) {
            return false;
        }

        await this.setDefaultConfigs();

        return true;
    }

    public async setDefaultConfigs(): Promise<Config> {
        const config: Config = Config.Builder.build();

        config.setDefaultConfigs();

        return await this.configRepository.create(config);
    }

    public async findConfig(): Promise<Config | null> {
        const cachedConfig = await this.cacheService.get<Config>(this.CONFIG_LIST_CACHE_KEY);

        if (cachedConfig) {
            console.log('Fetching configs from cache.');
            return cachedConfig;
        }

        console.log('Fetching configs from the database...');
        const config: Config | null = await this.configRepository.findConfig();

        await this.cacheService.set(this.CONFIG_LIST_CACHE_KEY, config, this.CACHE_TTL);
        return config;
    }

    public async listConfig(): Promise<Config> {
        const config: Config | null = await this.findConfig();

        if (!config) {
            throw new HttpException("Erro referente a configuração. Entre em contato com os desenvolvedores.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return config;
    }

    public async updateConfig(data: ConfigRequestDTO): Promise<Config> {
        const config: Config | null = await this.findConfig();

        if (!config) {
            throw new HttpException("Erro referente a configuração. Entre em contato com os desenvolvedores.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        config.update(data.classDurationInMinutes);
        
        const updatedConfig: Config = await this.configRepository.update(config);

        await this.cacheService.del(this.CONFIG_LIST_CACHE_KEY);

        return updatedConfig
    }
}