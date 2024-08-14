import { PresenceBuilder } from "src/builders/presence.builder";
import { Teacher } from "./teacher.entity";
import { User } from "./user.entity";

export class Presence {
    constructor(
        private readonly id: number,
        private readonly user: User,
        private readonly teacher: Teacher,
        private readonly startsAt: Date,
        private readonly endsAt: Date
    ) { }

    public get getId(): number {
        return this.id;
    }

    public get getUser(): User {
        return this.user;
    }

    public get getTeacher(): Teacher {
        return this.teacher;
    }

    public get getStartsAt(): Date {
        return this.startsAt;
    }

    public get getEndsAt(): Date {
        return this.endsAt
    }

    public static get Builder() {
        return new PresenceBuilder();
    }
}