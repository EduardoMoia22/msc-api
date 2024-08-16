import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { signInDTO } from "src/DTOs/auth.dtos";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "src/services/auth.service";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDTO) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}