import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { DataModule } from './modules/data.module';
import { TeacherModule } from './modules/teacher.module';
import { PresenceModule } from './modules/presence.module';

@Module({
  imports: [DataModule, UserModule, TeacherModule, PresenceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
