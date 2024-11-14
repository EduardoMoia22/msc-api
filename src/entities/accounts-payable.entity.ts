import { HttpException, HttpStatus } from "@nestjs/common";
import { Utils } from "src/tools/utils.tool";
import { AccountCategory } from "./account-category.entity";
import { AccountStatus } from "./account-status.entity";
import { AccountsPayableBuilder } from "src/builders/accounts-payable.builder";

export class AccountsPayable {
    constructor(
        private readonly id: string,
        private readonly description: string,
        private readonly category: AccountCategory,
        private readonly dueDate: Date,
        private readonly estimatedValue: number,
        private readonly actualValue: number | null,
        private readonly status: AccountStatus,
        private readonly notes: string | null,
        private readonly reminderEnabled: boolean,
        private readonly reminderDaysBefore: number | null,
    ) {
        this.validate();
    }

    private validate(): void {
        // Ensure the estimated value is not negative
        if (this.estimatedValue < 0) {
            throw new HttpException('The estimated value cannot be negative.', HttpStatus.BAD_REQUEST);
        }

        // Ensure due date is not in the past
        if (this.dueDate < Utils.getCurrentGMTDateTime()) {
            throw new HttpException('The due date cannot be in the past.', HttpStatus.BAD_REQUEST);
        }

        if (!Object.values(AccountStatus).includes(this.status)) {
            throw new Error("Invalid account status.");
        }

        if (this.reminderEnabled && (this.reminderDaysBefore === null || this.reminderDaysBefore < 0)) {
            throw new Error("Reminder days before must be a positive number if reminders are enabled.");
        }
    }

    public shouldSendReminder(currentDate: Date): boolean {
        if (!this.reminderEnabled || this.reminderDaysBefore === null) return false;

        // Cria uma nova instância de Date para o reminderDate
        const reminderDate = new Date(this.dueDate);
        
        // Subtrai os dias para calcular a data de envio do lembrete
        reminderDate.setDate(reminderDate.getDate() - this.reminderDaysBefore);
    
        // Zera as horas de ambas as datas para comparar apenas os dias
        reminderDate.setUTCHours(0, 0, 0, 0);  // Zera hora no UTC
        currentDate.setUTCHours(0, 0, 0, 0);  // Zera hora no UTC
    
        console.log(currentDate.toUTCString())  // Para depuração
        console.log(reminderDate.toUTCString())  // Para depuração
    
        // Compara as duas datas
        return currentDate.getTime() === reminderDate.getTime();
    }

    public get getId(): string {
        return this.id;
    }

    public get getDescription(): string {
        return this.description;
    }

    public get getCategory(): AccountCategory {
        return this.category;
    }

    public get getDueDate(): Date {
        return this.dueDate;
    }

    public get getEstimatedValue(): number {
        return this.estimatedValue;
    }

    public get getActualValue(): number | null {
        return this.actualValue;
    }

    public get getStatus(): AccountStatus {
        return this.status;
    }

    public get getNotes(): string | null {
        return this.notes;
    }

    public get getReminderEnabled(): boolean {
        return this.reminderEnabled;
    }

    public get getReminderDaysBefore(): number | null {
        return this.reminderDaysBefore;
    }

    public static get Builder(): AccountsPayableBuilder {
        return new AccountsPayableBuilder();
    }
}
