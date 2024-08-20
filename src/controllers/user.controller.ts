import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserRequestDTO, UserResponseDTO } from "src/DTOs/user.dtos";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@ApiBearerAuth()
@ApiTags('Usuário')
@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar usuário' })
    @ApiResponse({ status: 200, description: 'Ok', type: UserResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 409, description: 'Conflict.' })
    @Post()
    public async createUser(@Body() data: UserRequestDTO): Promise<UserResponseDTO> {
        const user: User = await this.userService.createUser(data);

        return UserResponseDTO.fromEntity(user);
    }
}