import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export type signInDTO = {
    email: string;
    password: string;
}

export class AuthRequestDTO {
    @ApiProperty({ description: 'Email' })
    @IsNotEmpty({
        message: "Email é obrigatório"
    })
    @IsEmail({}, { message: "Insira um email válido." })
    public email: string;

    @ApiProperty({ description: 'Senha' })
    @IsNotEmpty({
        message: "Senha é obrigatória"
    })
    public password: string;
}

export class authResponseDTO {
    @ApiProperty({ description: 'Token de acesso, usado para autorizar requests' })
    public access_token: string;
}