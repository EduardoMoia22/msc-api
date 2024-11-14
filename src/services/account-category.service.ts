import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AccountCategoryRequestDTO } from "src/DTOs/account-category.dtos";
import { AccountCategory } from "src/entities/account-category.entity";
import { AccountCategoryMapper } from "src/mappers/account-category.mapper";
import { AccountCategoryRepository } from "src/repositories/account-category.repository";

@Injectable()
export class AccountCategoryService {
    constructor(private readonly accountCategoryRepository: AccountCategoryRepository) { }

    public async createCategory(data: AccountCategoryRequestDTO): Promise<AccountCategory> {
        const accountCategory = AccountCategoryMapper.dtoToEntity(data);

        return await this.accountCategoryRepository.create(accountCategory);
    }

    public async findById(id: string): Promise<AccountCategory> {
        const accountCategory: AccountCategory | null = await this.accountCategoryRepository.findById(id);

        if (!accountCategory) {
            throw new HttpException("Categoria inválida.", HttpStatus.NOT_FOUND);
        }

        return accountCategory;
    }
}