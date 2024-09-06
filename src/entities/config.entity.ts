import { ConfigBuilder } from "builders/config.builder";

export class Config {
    constructor(
        private readonly id: number,
        private classDurationInMinutes: number
    ) { }

    public setDefaultConfigs(): boolean {
        this.classDurationInMinutes = 60;
        return true;
    }

    public update(classDurationInMinutes: number): void {
        this.classDurationInMinutes = classDurationInMinutes;
    }

    public get getId(): number {
        return this.id;
    }

    public get getClassDurationInMinutes(): number {
        return this.classDurationInMinutes;
    }

    public static get Builder() {
        return new ConfigBuilder();
    }
}