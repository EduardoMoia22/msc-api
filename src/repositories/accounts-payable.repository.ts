
import { Injectable } from "@nestjs/common";
import { AccountStatus } from "@prisma/client";
import { PrismaService } from "src/configs/prisma.service";
import { AccountsPayable } from "src/entities/accounts-payable.entity";
import { AccountsPayableMapper } from "src/mappers/accounts-payable.mapper";

@Injectable()
export class AccountsPayableRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: AccountsPayable): Promise<AccountsPayable> {
        const createAccount = await this.prisma.accountsPayable.create({
            data: AccountsPayableMapper.entityToPrisma(data),
            include: {
                category: true
            }
        });

        return AccountsPayableMapper.prismaToEntity(createAccount);
    }

    public async listAllAccounts(): Promise<AccountsPayable[]> {
        const accounts = await this.prisma.accountsPayable.findMany({
            include: {
                category: true
            }
        });

        return await Promise.all(
            accounts.map((account) => {
                return AccountsPayableMapper.prismaToEntity(account);
            })
        );
    }

    public async findById(id: string): Promise<AccountsPayable> {
        const account = await this.prisma.accountsPayable.findUnique({
            where: {
                id: id
            },
            include: {
                category: true
            }
        });

        if (!account) {
            return null;
        }

        return AccountsPayableMapper.prismaToEntity(account);
    }

    public async findDueSoon(currentDate: Date): Promise<AccountsPayable[]> {
        const date = new Date();
        date.setDate(currentDate.getDate() + 1); // Checa lembretes para o dia seguinte

        const accounts = await this.prisma.accountsPayable.findMany({
            where: {
                reminderEnabled: true,
                dueDate: {
                    gte: date,
                },
                status: AccountStatus.pending
            },
            include: {
                category: true
            }
        });

        return await Promise.all(
            accounts.map((account) => {
                return AccountsPayableMapper.prismaToEntity(account);
            })
        );
    }
}
