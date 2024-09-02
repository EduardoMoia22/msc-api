import { Student } from "src/entities/student.entity";

export class StudentBuilder {
    private id: number;
    private rm: string;
    private name: string;
    private email: string;
    private cpf: string;
    private entryDate: Date;
    private password: string;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withRM(rm: string): this {
        this.rm = rm;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public withEmail(email: string): this {
        this.email = email;
        return this;
    }

    public withCPF(cpf: string): this {
        this.cpf = cpf;
        return this;
    }

    public withEntryDate(entryDate: Date): this {
        this.entryDate = entryDate;
        return this;
    }

    public withPassword(password: string): this {
        this.password = password;
        return this;
    }

    public build(): Student {
        return new Student(this.id, this.rm, this.name, this.email, this.cpf, this.entryDate, this.password);
    }
}