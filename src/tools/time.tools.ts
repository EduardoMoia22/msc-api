export class TimeTools {
    public static calculateTotalClassesDurationInMinutes(classDurationInMinutes: number, quantityOfClasses: number): number {
        return classDurationInMinutes * quantityOfClasses;
    }

    public static addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60000);
    }

    public static isValidDate(dateString: string): boolean {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };
}