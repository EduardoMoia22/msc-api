import * as dotenv from 'dotenv';

dotenv.config();

export class JwtConfig {
    public static readonly JWT_SECRET: string = process.env.JWT_SECRET || '';
}
