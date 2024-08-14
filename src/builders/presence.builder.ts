import { Presence } from "src/entities/presence.entity";
import { Teacher } from "src/entities/teacher.entity";
import { User } from "src/entities/user.entity";

export class PresenceBuilder {
    private id: number;
    private user: User;
    private teacher: Teacher;
    private startsAt: Date;
    private endsAt: Date;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withUser(user: User): this {
        this.user = user;
        return this;
    }

    public withTeacher(teacher: Teacher): this {
        this.teacher = teacher;
        return this;
    }

    public withStartsAt(startsAt: Date): this {
        this.startsAt = startsAt;
        return this;
    }

    public withEndsAt(endsAt: Date): this {
        this.endsAt = endsAt;
        return this;
    }

    public build(): Presence {
        return new Presence(this.id, this.user, this.teacher, this.startsAt, this.endsAt);
    }
}
