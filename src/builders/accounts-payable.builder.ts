import { AccountCategory } from "src/entities/account-category.entity";
import { AccountStatus } from "src/entities/account-status.entity";
import { AccountsPayable } from "src/entities/accounts-payable.entity";

export class AccountsPayableBuilder {
    private id: string;
    private description: string;
    private category: AccountCategory;
    private dueDate: Date;
    private estimatedValue: number;
    private actualValue: number | null = null;
    private status: AccountStatus;
    private notes: string | null = null;
    private reminderEnabled: boolean = false;
    private reminderDaysBefore: number | null = null;

    public withId(id: string): this {
        this.id = id;
        return this;
    }

    public withDescription(description: string): this {
        this.description = description;
        return this;
    }

    public withCategory(category: AccountCategory): this {
        this.category = category;
        return this;
    }

    public withDueDate(dueDate: Date): this {
        this.dueDate = dueDate;
        return this;
    }

    public withEstimatedValue(estimatedValue: number): this {
        this.estimatedValue = estimatedValue;
        return this;
    }

    public withActualValue(actualValue: number): this {
        this.actualValue = actualValue;
        return this;
    }

    public withStatus(status: AccountStatus): this {
        this.status = status;
        return this;
    }

    public withNotes(notes: string): this {
        this.notes = notes;
        return this;
    }

    public withReminderEnabled(reminderEnabled: boolean): this {
        this.reminderEnabled = reminderEnabled;
        return this;
    }

    public withReminderDaysBefore(reminderDaysBefore: number): this {
        this.reminderDaysBefore = reminderDaysBefore;
        return this;
    }

    public build(): AccountsPayable {
        return new AccountsPayable(
            this.id,
            this.description,
            this.category,
            this.dueDate,
            this.estimatedValue,
            this.actualValue,
            this.status,
            this.notes,
            this.reminderEnabled,
            this.reminderDaysBefore
        );
    }
}
