import { ClassBuilder } from "src/builders/class.builder";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

export class Class {
    constructor(
        private readonly id: number,
        private readonly teacher: Teacher,
        private readonly students: Student[],
        private readonly startsAt: Date,
        private readonly endsAt: Date
    ) {

    }

    public get getId(): number {
        return this.id;
    }

    public get getTeacher(): Teacher {
        return this.teacher;
    }

    public get getStudents(): Student[] {
        return this.students;
    }

    public get getStartsAt(): Date {
        return this.startsAt;
    }

    public get getEndsAt(): Date {
        return this.endsAt;
    }

    public static get Builder(): ClassBuilder {
        return new ClassBuilder();
    }

}