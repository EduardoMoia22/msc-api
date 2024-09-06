import { Config } from "src/entities/config.entity";

export class ConfigBuilder {
    private id: number;
    private classDurationInMinutes: number;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withClassDurationInMinutes(classDurationInMinutes: number): this {
        this.classDurationInMinutes = classDurationInMinutes;
        return this;
    }

    public build(): Config {
        return new Config(this.id, this.classDurationInMinutes);
    }
}