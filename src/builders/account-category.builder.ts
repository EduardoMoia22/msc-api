import { AccountCategory } from "src/entities/account-category.entity";

export class AccountCategoryBuilder {
    private id: string;
    private name: string;
    private description: string | null = null;

    public withId(id: string): this {
        this.id = id;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public withDescription(description: string): this {
        this.description = description;
        return this;
    }

    public build(): AccountCategory {
        return new AccountCategory(this.id, this.name, this.description);
    }
}
