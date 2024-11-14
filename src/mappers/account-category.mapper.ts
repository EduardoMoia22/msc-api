
import { AccountCategory as RawCategory } from "@prisma/client";
import { AccountCategoryRequestDTO } from "src/DTOs/account-category.dtos";
import { AccountCategory } from "src/entities/account-category.entity";

export class AccountCategoryMapper {
    public static prismaToEntity(data: RawCategory): AccountCategory {
        return AccountCategory.Builder
            .withId(data.id)
            .withName(data.name)
            .withDescription(data.description)
            .build();
    }

    public static entityToPrisma(data: AccountCategory): Omit<RawCategory, "id"> {
        return {
            name: data.getName,
            description: data.getDescription
        };
    }

    public static dtoToEntity(data: AccountCategoryRequestDTO): AccountCategory {
        return AccountCategory.Builder
            .withName(data.name)
            .withDescription(data.description)
            .build()
    }
}
