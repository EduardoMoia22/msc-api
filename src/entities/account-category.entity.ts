import { AccountCategoryBuilder } from "src/builders/account-category.builder";

export class AccountCategory {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly description: string | null
    ) {
        this.validate();
    }

    private validate(): void {
        if (this.name.trim() === "") {
            throw new Error("Category name cannot be empty.");
        }
    }

    public get getId(): string {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getDescription(): string | null {
        return this.description;
    }

    public static get Builder(): AccountCategoryBuilder {
        return new AccountCategoryBuilder();
    }
}
