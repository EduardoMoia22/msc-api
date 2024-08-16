import { Module } from '@nestjs/common';
import { DataModule } from './modules/data.module';
import { TeacherModule } from './modules/teacher.module';
import { PresenceModule } from './modules/presence.module';
import { StudentModule } from './modules/student.module';

@Module({
  imports: [DataModule, StudentModule, TeacherModule, PresenceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
