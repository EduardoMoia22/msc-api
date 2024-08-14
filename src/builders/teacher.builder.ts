import { Teacher } from "src/entities/teacher.entity";

export class TeacherBuilder{
    private id: number;
    private name: string;
    private email: string;

    public withId(id: number): this{
        this.id = id;
        return this;
    }

    public withName(name: string): this{
        this.name = name;
        return this;
    }

    public withEmail(email: string): this{
        this.email = email;
        return this;
    }

    public build(): Teacher {
        return new Teacher(this.id, this.name, this.email);
    }
}