import { Module } from '@nestjs/common';
import { DataModule } from './modules/data.module';
import { TeacherModule } from './modules/teacher.module';
import { PresenceModule } from './modules/presence.module';
import { StudentModule } from './modules/student.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from './modules/config.module';
import { PlanModule } from './modules/plan.module';
import { EnrollmentModule } from './modules/enrollment.module';
import { PaymentMethodModule } from './modules/payment-method.module';
import { PaymentModule } from './modules/payment.module';
import { BillingModule } from './modules/billing.module';
import { AccountCategoryModule } from './modules/account-category.module';
import { AccountsPayableModule } from './modules/accounts-payable.module';

@Module({
  imports: [
    DataModule,
    StudentModule,
    TeacherModule,
    PresenceModule,
    UserModule,
    AuthModule,
    ConfigModule,
    PlanModule,
    EnrollmentModule,
    PaymentMethodModule,
    PaymentModule,
    BillingModule,
    AccountCategoryModule,
    AccountsPayableModule
  ],
  controllers: [],
})
export class AppModule { }
