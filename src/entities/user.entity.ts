import { UserBuilder } from "src/builders/user.builder";

export class User{
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly email: string
    ) {}

    public static get Builder() {
        return new UserBuilder();
    }

    public get getId(): number{
        return this.id;
    }

    public get getName(): string{
        return this.name;
    }

    public get getEmail(): string{
        return this.email;
    }
}