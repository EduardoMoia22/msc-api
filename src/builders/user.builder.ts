import { User } from "src/entities/user.entity";

export class UserBuilder {
    private id: number;
    private name: string;
    private email: string;
    private password: string;

    public withId(id: number): this {
        this.id = id;
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

    public withPassword(password: string): this {
        this.password = password;
        return this;
    }

    public build(): User {
        return new User(this.id, this.name, this.email, this.password);
    }
}