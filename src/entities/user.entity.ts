import { UserBuilder } from "builders/user.builder";

export class User {
    constructor(
        private readonly id: number,
        private name: string,
        private email: string,
        private password: string
    ) {
    }

    public static get Builder(): UserBuilder {
        return new UserBuilder();
    }

    public set setName(name: string) {
        this.name = name;
    }

    public set setEmail(email: string) {
        this.email = email;
    }

    public set setPassword(password: string) {
        this.password = password;
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getEmail(): string {
        return this.email;
    }

    public get getPassword(): string {
        return this.password
    }
}