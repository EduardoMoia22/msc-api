import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "src/configs/jwt.config";
import { AuthService } from "src/services/auth.service";
import { AuthController } from "src/controllers/auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JwtConfig.JWT_SECRET,
            signOptions: { expiresIn: '86400s' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }