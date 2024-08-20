import { Class } from "src/entities/class.entity";
import { Student } from "src/entities/student.entity";
import { Teacher } from "src/entities/teacher.entity";

export class ClassBuilder {
    private id: number;
    private teacher: Teacher;
    private students: Student[];
    private startsAt: Date;
    private endsAt: Date;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withTeacher(teacher: Teacher): this {
        this.teacher = teacher;
        return this;
    }

    public withStudents(student: Student[]): this {
        this.students = student;
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

    public build(): Class {
        return new Class(
            this.id,
            this.teacher,
            this.students,
            this.startsAt,
            this.endsAt
        );
    }
}