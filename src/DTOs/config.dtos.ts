import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Config } from "entities/config.entity";

export class ConfigRequestDTO {
    @ApiProperty({ description: "Duração de uma aula" })
    @IsNotEmpty({
        message: "A duração da aula é obrigatória"
    })
    @IsNumber({}, { message: "A duração da aula deve ser um número" })
    @Min(10, { message: "A duração mínima da aula deve ser de 2 dígitos (mínimo de 10 minutos)" })
    @Max(9999, { message: "A duração máxima da aula deve ser de 4 dígitos (máximo de 9999 minutos)" })
    public classDurationInMinutes: number;
}

export class ConfigResponseDTO {
    @ApiProperty({ description: "Id da config" })
    public readonly id: number

    @ApiProperty({ description: "Duração de uma aula" })
    public readonly classDurationInMinutes: number

    constructor(
        id: number,
        classDurationInMinutes: number
    ) {
        this.id = id;
        this.classDurationInMinutes = classDurationInMinutes;
    }

    static fromEntity(config: Config): ConfigResponseDTO {
        return new ConfigResponseDTO(config.getId, config.getClassDurationInMinutes);
    }
}