import { PresenceBuilder } from "src/builders/presence.builder";
import { Teacher } from "./teacher.entity";
import { Student } from "./student.entity";
import { Class } from "./class.entity";

export class Presence {
    constructor(
        private readonly id: number,
        private readonly student: Student,
        private readonly teacher: Teacher,
        private readonly classEntity: Class,
        private readonly startsAt: Date,
        private readonly endsAt: Date
    ) { }

    public static isDuplicate(existingPresence: Presence, startsAt: Date, endsAt: Date): boolean {
        return existingPresence.startsAt <= endsAt && existingPresence.endsAt >= startsAt;
    }

    public get getId(): number {
        return this.id;
    }

    public get getStudent(): Student {
        return this.student;
    }

    public get getTeacher(): Teacher {
        return this.teacher;
    }

    public get getClass(): Class {
        return this.classEntity;
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