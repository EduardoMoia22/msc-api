import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/entities/plan.entity';

export class PlanRequestDTO {
    @ApiProperty({
        description: 'Name of the plan',
        example: 'Weekly Class'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Description of the plan',
        example: 'This plan includes 4 classes per month'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Price of the plan in cents',
        example: 5000
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: 'Frequency of the plan (weekly, monthly, etc.)',
        example: 'weekly'
    })
    @IsNotEmpty()
    @IsString()
    frequency: string;
}

export class PlanResponseDto {
    @ApiProperty({
        description: 'Unique identifier of the plan',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Name of the plan',
        example: 'Weekly Class'
    })
    name: string;

    @ApiProperty({
        description: 'Description of the plan',
        example: 'This plan includes 4 classes per month'
    })
    description: string;

    @ApiProperty({
        description: 'Price of the plan in cents',
        example: 5000
    })
    price: number;

    @ApiProperty({
        description: 'Frequency of the plan (weekly, monthly, etc.)',
        example: 'weekly'
    })
    frequency: string;

    constructor(
        id: number,
        name: string,
        description: string,
        price: number,
        frequency: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.frequency = frequency;
    }

    public static fromEntity(plan: Plan): PlanResponseDto {
        return new PlanResponseDto(
            plan.getId,
            plan.getName,
            plan.getDescription,
            plan.getPrice,
            plan.getFrequency
        );
    }
}
