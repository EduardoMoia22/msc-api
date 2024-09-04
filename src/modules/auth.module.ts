import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "configs/jwt.config";
import { AuthService } from "services/auth.service";
import { AuthController } from "controllers/auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JwtConfig.JWT_SECRET,
            signOptions: { expiresIn: '30d' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }