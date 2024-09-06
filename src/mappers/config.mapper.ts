import { Config as RawConfig } from "@prisma/client";
import { Config } from "src/entities/config.entity";

export class ConfigMapper {
    public static prismaToEntity(data: RawConfig): Config {
        return Config.Builder
            .withId(data.id)
            .withClassDurationInMinutes(data.classDurationInMinutes)
            .build();
    }

    public static entityToPrisma(data: Config): Omit<RawConfig, "id"> {
        return {
            classDurationInMinutes: data.getClassDurationInMinutes
        }
    }
}