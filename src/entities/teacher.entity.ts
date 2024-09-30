import { TeacherBuilder } from "src/builders/teacher.builder";

export class Teacher{
    constructor(
        private readonly id: number,
        private name: string,
        private email: string
    ) {}

    public static get Builder() {
        return new TeacherBuilder();
    }

    public updateAllAllowedFields(
        name: string,
        email: string
    ){
        this.name = name;
        this.email = email;
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