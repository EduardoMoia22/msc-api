import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { createUserProps, UserService } from "src/services/user.service";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Post()
    public async createUser(@Body() data: createUserProps): Promise<User> {
        return await this.userService.createUser(data);
    }
}