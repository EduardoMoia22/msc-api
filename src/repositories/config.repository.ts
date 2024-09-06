import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { Config } from "src/entities/config.entity";
import { ConfigMapper } from "src/mappers/config.mapper";

@Injectable()
export class ConfigRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    public async create(config: Config): Promise<Config> {
        const createConfig = await this.prisma.config.create({
            data: ConfigMapper.entityToPrisma(config)
        });

        return ConfigMapper.prismaToEntity(createConfig);
    }

    public async findConfig(): Promise<Config | null> {
        const config = await this.prisma.config.findMany();

        if (config.length === 0) {
            return null;
        }

        return ConfigMapper.prismaToEntity(config[0]);
    }

    public async update(config: Config): Promise<Config> {
        const updateConfig = await this.prisma.config.update({
            data: ConfigMapper.entityToPrisma(config),
            where: {
                id: config.getId
            }
        });

        return ConfigMapper.prismaToEntity(updateConfig);
    }
}