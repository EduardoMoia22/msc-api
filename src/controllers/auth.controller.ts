import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { authResponseDTO, signInDTO } from "DTOs/auth.dtos";
import { AuthService } from "services/auth.service";

@ApiTags('Auth')
@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autorizar usuário' })
    @ApiResponse({ status: 200, description: 'Ok', type: authResponseDTO })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post('login')
    signIn(@Body() signInDto: signInDTO) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}