import { ApiProperty } from "@nestjs/swagger";

export type signInDTO = {
    email: string;
    password: string;
}

export class authResponseDTO{
    @ApiProperty({description: 'Token de acesso, usado para autorizar requests'})
    public access_token: string;
}