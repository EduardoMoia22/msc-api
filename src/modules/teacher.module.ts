import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { TeacherController } from "src/controllers/teacher.controller";
import { TeacherService } from "src/services/teacher.service";
import { CachingModule } from "./cache.module";

@Module({
    imports: [CachingModule],
    controllers: [TeacherController],
    providers: [TeacherService]
})
export class TeacherModule {
}