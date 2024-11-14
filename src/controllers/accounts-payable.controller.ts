import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AccountsPayableRequestDTO, AccountsPayableResponseDTO } from "src/DTOs/accounts-payable.dtos";
import { AccountsPayable } from "src/entities/accounts-payable.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { AccountsPayableService } from "src/services/accounts-payable.service";

@Controller("accounts-payable")
export class AccountsPayableController {
    constructor(private readonly accountsPayableService: AccountsPayableService) { }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Registrar uma nova conta a pagar' })
    @ApiResponse({ status: 200, description: 'Ok', type: AccountsPayableResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Post()
    public async register(@Body() body: AccountsPayableRequestDTO): Promise<AccountsPayableResponseDTO> {
        const account: AccountsPayable = await this.accountsPayableService.registerAccount(body);
        return AccountsPayableResponseDTO.fromEntity(account);
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar todas as contas a pagar' })
    @ApiResponse({ status: 200, description: 'Ok', type: AccountsPayableResponseDTO, isArray: true })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @Get()
    public async listAll(): Promise<AccountsPayableResponseDTO[]> {
        const accounts: AccountsPayable[] = await this.accountsPayableService.listAllAccounts();
        return accounts.map(AccountsPayableResponseDTO.fromEntity);
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar uma conta a pagar pelo ID' })
    @ApiResponse({ status: 200, description: 'Ok', type: AccountsPayableResponseDTO })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @Get("/:id")
    public async findById(@Param("id") id: string): Promise<AccountsPayableResponseDTO> {
        const account: AccountsPayable = await this.accountsPayableService.findById(id);
        return AccountsPayableResponseDTO.fromEntity(account);
    }
}