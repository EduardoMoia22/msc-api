import { StudentBuilder } from "src/builders/student.builder";

export class Student {
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly email: string,
        private readonly password: string,
    ) { }

    public static get Builder() {
        return new StudentBuilder();
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
        return this.password;
    }
}