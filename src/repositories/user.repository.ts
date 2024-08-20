import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(user: User): Promise<User> {
        const createUser = await this.prisma.user.create({
            data: {
                name: user.getName,
                email: user.getEmail,
                password: user.getPassword
            }
        });

        return User.Builder
            .withId(createUser.id)
            .withName(createUser.name)
            .withEmail(createUser.email)
            .withPassword(createUser.password)
            .build()
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return null;
        }

        return User.Builder
            .withId(user.id)
            .withName(user.name)
            .withEmail(user.email)
            .withPassword(user.password)
            .build()
    }

    public async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return Promise.all(
            users.map((user) => {
                return User.Builder
                    .withId(user.id)
                    .withName(user.name)
                    .withEmail(user.email)
                    .withPassword(user.password)
                    .build()
            })
        );
    }
}