import { AccountsPayable } from "src/entities/accounts-payable.entity";
import { Prisma, AccountsPayable as RawAccountsPayable } from "@prisma/client";
import { AccountStatus } from "src/entities/account-status.entity";
import { AccountsPayableRequestDTO } from "src/DTOs/accounts-payable.dtos";
import { AccountCategoryMapper } from "./account-category.mapper";
import { AccountCategory } from "src/entities/account-category.entity";

type AccountWithCategory = Prisma.AccountsPayableGetPayload<{
    include: {
        category: true
    }
}>

export class AccountsPayableMapper {
    public static prismaToEntity(data: AccountWithCategory): AccountsPayable {
        return AccountsPayable.Builder
            .withId(data.id)
            .withDescription(data.description)
            .withDueDate(data.dueDate)
            .withEstimatedValue(data.estimatedValue)
            .withActualValue(data.actualValue)
            .withStatus(data.status as AccountStatus)
            .withNotes(data.notes)
            .withReminderEnabled(data.reminderEnabled)
            .withReminderDaysBefore(data.reminderDaysBefore)
            .withCategory(AccountCategoryMapper.prismaToEntity(data.category))
            .build();
    }

    public static entityToPrisma(data: AccountsPayable): Omit<RawAccountsPayable, "id"> {
        return {
            description: data.getDescription,
            dueDate: data.getDueDate,
            estimatedValue: data.getEstimatedValue,
            actualValue: data.getActualValue,
            status: this.mapStatusToPrisma(data.getStatus),
            notes: data.getNotes,
            reminderEnabled: data.getReminderEnabled,
            reminderDaysBefore: data.getReminderDaysBefore,
            accountCategoryId: data.getCategory.getId
        };
    }

    public static mapStatusToPrisma(status: AccountStatus): RawAccountsPayable["status"] {
        switch (status) {
            case AccountStatus.PENDING:
                return "pending";
            case AccountStatus.PAID:
                return "paid";
            case AccountStatus.OVERDUE:
                return "overdue";
            default:
                throw new Error(`Unknown account status: ${status}`);
        }
    }

    public static dtoToEntity(data: AccountsPayableRequestDTO, accountCategory: AccountCategory): AccountsPayable {
        return AccountsPayable.Builder
            .withDescription(data.description)
            .withDueDate(data.dueDate)
            .withEstimatedValue(data.estimatedValue)
            .withActualValue(data.actualValue)
            .withStatus(data.status as AccountStatus)
            .withNotes(data.notes)
            .withReminderEnabled(data.reminderEnabled)
            .withReminderDaysBefore(data.reminderDaysBefore)
            .withCategory(accountCategory)
            .build();
    }
}
