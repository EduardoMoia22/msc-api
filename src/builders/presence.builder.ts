import { Class } from "src/entities/class.entity";
import { Presence } from "src/entities/presence.entity";
import { Student } from "src/entities/student.entity";
import { Teacher } from "src/entities/teacher.entity";

export class PresenceBuilder {
    private id: number;
    private student: Student;
    private teacher: Teacher;
    private class: Class
    private startsAt: Date;
    private endsAt: Date;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withStudent(student: Student): this {
        this.student = student;
        return this;
    }

    public withTeacher(teacher: Teacher): this {
        this.teacher = teacher;
        return this;
    }

    public withClass(classEntity: Class): this {
        this.class = classEntity;
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
        return new Presence(this.id, this.student, this.teacher, this.class, this.startsAt, this.endsAt);
    }
}
