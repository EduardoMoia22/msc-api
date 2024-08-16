import * as bcrypt from 'bcrypt';

export class Utils {
    private static readonly SALT_ROUNDS = 10;

    public static async hashPassword(plainTextPassword: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(plainTextPassword, this.SALT_ROUNDS);
        return hashedPassword;
    }

    public static async checkPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
        return isMatch;
    }
}