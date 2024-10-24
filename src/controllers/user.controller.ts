import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDTO, UserRequestDTO, UserResponseDTO } from "src/DTOs/user.dtos";
import { User } from "src/entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/services/user.service";

@ApiBearerAuth()
@ApiTags('Usuário')
@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Ok', type: UserResponseDTO, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get()
    public async findAllUsers(): Promise<UserResponseDTO[]> {
        const users: User[] = await this.userService.findAllUsers();

        return Promise.all(
            users.map(UserResponseDTO.fromEntity)
        );
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Ok', type: UserResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get(":id")
    public async findUserById(@Param('id') id: string): Promise<UserResponseDTO> {
        const user: User = await this.userService.findUserById(parseInt(id));

        return UserResponseDTO.fromEntity(user);
    }
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Ok', type: UserResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Put("/:id")
    public async updateUser(@Param("id") id: string, @Body() body: UpdateUserDTO): Promise<UserResponseDTO> {
        const updateUser: User = await this.userService.updateUser(body, parseInt(id));

        return UserResponseDTO.fromEntity(updateUser);
    }
}