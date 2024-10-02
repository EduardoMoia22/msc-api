import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequestDTO, authResponseDTO, signInDTO } from "src/DTOs/auth.dtos";
import { AuthService } from "src/services/auth.service";

@ApiTags('Auth')
@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autorizar usuário' })
    @ApiResponse({ status: 200, description: 'Ok', type: authResponseDTO })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post('login')
    signIn(@Body() signInDto: AuthRequestDTO) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}