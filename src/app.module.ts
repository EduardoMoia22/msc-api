import { Module } from '@nestjs/common';
import { DataModule } from './modules/data.module';
import { TeacherModule } from './modules/teacher.module';
import { PresenceModule } from './modules/presence.module';
import { StudentModule } from './modules/student.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [DataModule, StudentModule, TeacherModule, PresenceModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
