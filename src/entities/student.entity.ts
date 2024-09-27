import { StudentBuilder } from "src/builders/student.builder";

export class Student {
    constructor(
        private readonly id: number,
        private rm: string,
        private name: string,
        private email: string,
        private cpf: string,
        private entryDate: Date,
        private password: string,
    ) { }

    public generateRM(lastStudent: Student): void {
        const entryDate: string = this.entryDate.getFullYear().toString();

        let sequential: number = 1;

        if (lastStudent) {
            sequential = parseInt(lastStudent.rm.slice(-3)) + 1;
        }

        console.log(entryDate)
        console.log(sequential.toString().padStart(3, '0'));

        this.rm = `${entryDate}${sequential.toString().padStart(3, '0')}`;
    }

    public set setEntryDate(entryDate: Date) {
        this.entryDate = entryDate;
    }

    public updateAllAllowedFields(
        name: string,
        cpf: string,
        email: string
    ){
        this.name = name;
        this.cpf = cpf;
        this.email = email;
    }

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

    public get getCPF(): string {
        return this.cpf;
    }

    public get getFormattedCpf(): string {
        return this.formatCpf(this.cpf);
    }

    private formatCpf(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    public get getEntryDate(): Date {
        return this.entryDate;
    }

    public get getRM(): string {
        return this.rm;
    }

    public get getPassword(): string {
        return this.password;
    }
}