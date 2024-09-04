import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "entities/user.entity";
import { JwtService } from "@nestjs/jwt";

type Payload = {
    sub: number;
    username: string;
    email: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    public async signIn(email: string, password: string): Promise<{ access_token: string }> {
        const user: User = await this.userService.signIn(email, password);

        const payload: Payload = { sub: user.getId, username: user.getName, email: user.getEmail };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}