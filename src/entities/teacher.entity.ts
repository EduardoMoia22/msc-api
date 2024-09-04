import { TeacherBuilder } from "builders/teacher.builder";

export class Teacher{
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly email: string
    ) {}

    public static get Builder() {
        return new TeacherBuilder();
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