import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AccountsPayableRequestDTO } from "src/DTOs/accounts-payable.dtos";
import { AccountCategory } from "src/entities/account-category.entity";
import { AccountsPayable } from "src/entities/accounts-payable.entity";
import { AccountsPayableRepository } from "src/repositories/accounts-payable.repository";
import { AccountCategoryService } from "./account-category.service";
import { AccountsPayableMapper } from "src/mappers/accounts-payable.mapper";
import { Utils } from "src/tools/utils.tool";

@Injectable()
export class AccountsPayableService {
    constructor(
        private readonly accountsPayableRepository: AccountsPayableRepository,
        private readonly accountCategoryService: AccountCategoryService
    ) { }

    public async registerAccount(data: AccountsPayableRequestDTO): Promise<AccountsPayable> {
        const accountCategoryExists: AccountCategory = await this.accountCategoryService.findById(data.categoryId);

        const account: AccountsPayable = AccountsPayableMapper.dtoToEntity(data, accountCategoryExists);

        return await this.accountsPayableRepository.create(account);
    }

    public async findById(id: string): Promise<AccountsPayable> {
        const accountExists: AccountsPayable | null = await this.accountsPayableRepository.findById(id);

        if (!accountExists) {
            throw new HttpException("Conta não existe.", HttpStatus.NOT_FOUND);
        }

        return accountExists;
    }

    @Cron(CronExpression.EVERY_10_SECONDS) // Executa todos os dias à meia-noite
    public async checkReminders(): Promise<void> {
        const currentDate = Utils.getCurrentGMTDateTime();

        // Busca contas a pagar que precisam de lembrete hoje
        const accountsToRemind = await this.accountsPayableRepository.findDueSoon(currentDate);

        for (const account of accountsToRemind) {
            if (account.shouldSendReminder(currentDate)) {
                await this.sendReminder(account);
            }
        }
    }

    public async listAllAccounts(): Promise<AccountsPayable[]> {
        return await this.accountsPayableRepository.listAllAccounts();
    }

    private async sendReminder(account: AccountsPayable): Promise<void> {
        // Lógica para enviar notificação (e.g., e-mail, SMS)
        console.log(`Lembrete: A conta ${account.getDescription} vence em ${account.getDueDate}`);
    }
}
