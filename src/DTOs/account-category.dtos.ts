import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountCategory } from 'src/entities/account-category.entity';

export class AccountCategoryRequestDTO {
    @ApiProperty({
        description: 'Nome da categoria de conta',
        example: 'Aluguel'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Descrição da categoria de conta',
        example: 'Despesas relacionadas a aluguel e moradia',
        required: false
    })
    @IsString()
    description?: string;
}

export class AccountCategoryResponseDTO {
    @ApiProperty({
        description: 'ID da categoria de conta',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'Nome da categoria de conta',
        example: 'Aluguel'
    })
    name: string;

    @ApiProperty({
        description: 'Descrição da categoria de conta',
        example: 'Despesas relacionadas a aluguel e moradia',
        required: false
    })
    description?: string;

    constructor(
        id: string,
        name: string,
        description: string | null,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static fromEntity(category: AccountCategory): AccountCategoryResponseDTO {
        return new AccountCategoryResponseDTO(
            category.getId,
            category.getName,
            category.getDescription
        );
    }
}
