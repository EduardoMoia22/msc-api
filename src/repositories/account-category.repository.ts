import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { AccountCategory } from "src/entities/account-category.entity";
import { AccountCategoryMapper } from "src/mappers/account-category.mapper";

@Injectable()
export class AccountCategoryRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: AccountCategory): Promise<AccountCategory> {
        const createAccountCategory = await this.prisma.accountCategory.create({
            data: AccountCategoryMapper.entityToPrisma(data)
        });

        return AccountCategoryMapper.prismaToEntity(createAccountCategory);
    }

    public async findById(id: string): Promise<AccountCategory | null> {
        const accountCategory = await this.prisma.accountCategory.findUnique({
            where: {
                id: id
            }
        });

        return AccountCategoryMapper.prismaToEntity(accountCategory);
    }
}