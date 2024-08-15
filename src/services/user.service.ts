import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";

export type createUserProps = {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    public async createUser(data: createUserProps): Promise<User> {
        const userExists: User | null = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            throw new HttpException("User already exists", HttpStatus.NOT_FOUND);
        }

        const user: User = User.Builder
            .withName(data.name)
            .withEmail(data.email)
            .withPassword(data.password)
            .build();

        return await this.userRepository.create(user);
    }

    public async findUserById(id: number): Promise<User> {
        const userExists: User | null = await this.userRepository.findById(id);

        if (!userExists) {
            throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
        }

        return userExists;
    }

    public async findUserByEmail(email: string): Promise<User> {
        const userExists: User | null = await this.userRepository.findByEmail(email);

        if (!userExists) {
            throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
        }

        return userExists;
    }

    public async findUserByPassword(password: string): Promise<User> {
        const userExists: User | null = await this.userRepository.findByPassword(password);

        if (!userExists) {
            throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
        }

        return userExists;
    }
}