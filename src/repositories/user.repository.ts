import { PrismaService } from "src/configs/prisma.service";
import { User } from "src/entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(protected prisma: PrismaService) { }
    public async create(user: User): Promise<User> {
        const createUser = await this.prisma.user.create({
            data: {
                name: user.getName,
                email: user.getEmail
            }
        });

        return User.Builder
            .withId(createUser.id)
            .withName(createUser.name)
            .withEmail(createUser.email)
            .build();
    }

    public async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return null;
        }

        return User.Builder
            .withId(user.id)
            .withName(user.name)
            .withEmail(user.email)
            .build();
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }

        return User.Builder
            .withId(user.id)
            .withName(user.name)
            .withEmail(user.email)
            .build();
    }
}