import { Module } from "@nestjs/common";
import { ClassController } from "src/controllers/class.controller";
import { ClassService } from "src/services/class.service";
import { PresenceModule } from "./presence.module";
import { TeacherModule } from "./teacher.module";
import { StudentModule } from "./student.module";

@Module({
    imports: [PresenceModule, TeacherModule, StudentModule],
    controllers: [ClassController],
    providers: [ClassService]
})
export class ClassModule {}
