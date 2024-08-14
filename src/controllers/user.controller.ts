import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { createUserProps, UserService } from "src/services/user.service";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    public async createUser(@Body() createUserDto: createUserProps): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get(":id")
    public async findUserById(@Param('id') id: string): Promise<User> {
        return await this.userService.findUserById(parseInt(id));
    }
}