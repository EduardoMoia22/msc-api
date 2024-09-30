import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRequestDTO } from "DTOs/user.dtos";
import { User } from "entities/user.entity";
import { UserMapper } from "mappers/user.mapper";
import { UserRepository } from "repositories/user.repository";
import { Utils } from "tools/utils.tool";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    public async createUser(data: UserRequestDTO): Promise<User> {
        const userAlreadyExists: User | null = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new HttpException("Já existe um usuário cadastrado com esse email. Verifique novamente as informações.", HttpStatus.CONFLICT);
        }

        const hashedPassword: string = await Utils.hashPassword(data.password);

        const user: User = UserMapper.requestDtoToEntity({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });

        return this.userRepository.create(user);
    }

    private async getUserByEmail(email: string, throwError = true): Promise<User | null> {
        const user: User | null = await this.userRepository.findByEmail(email);

        if (!user && throwError) {
            throw new HttpException("Usuário não encontrado.", HttpStatus.NOT_FOUND);
        }

        return user;
    }

    public async findUserByEmail(email: string): Promise<User> {
        return this.getUserByEmail(email);
    }

    public async signIn(email: string, password: string): Promise<User> {
        const user: User = await this.getUserByEmail(email, false);

        if (!user) {
            throw new UnauthorizedException("Email ou senha inválido.");
        }

        const isValid = await Utils.checkPassword(password, user.getPassword);

        if (!isValid) {
            throw new UnauthorizedException("Email ou senha inválido.");
        }

        return user;
    }

    public async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async findUserById(id: number): Promise<User>{
        const user: User | null = await this.userRepository.findById(id);

        if(!user){
            throw new HttpException("Usuário não encontrado.", HttpStatus.NOT_FOUND);
        }

        return user;
    }
}