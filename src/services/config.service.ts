import { HttpException, HttpStatus, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigRequestDTO } from "src/DTOs/config.dtos";
import { Config } from "src/entities/config.entity";
import { ConfigRepository } from "src/repositories/config.repository";

@Injectable()
export class ConfigService implements OnModuleInit {
    constructor(
        private readonly configRepository: ConfigRepository
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
        const config: Config | null = await this.configRepository.findConfig();

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

        return await this.configRepository.update(config);
    }
}