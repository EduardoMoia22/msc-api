import { Global, Module } from "@nestjs/common";
import { PrismaService } from "src/configs/prisma.service";
import { ConfigRepository } from "src/repositories/config.repository";
import { EnrollmentRepository } from "src/repositories/enrollment.repository";
import { PaymentMethodRepository } from "src/repositories/payment-method.repository";
import { PaymentRepository } from "src/repositories/payment.repository";
import { PlanRepository } from "src/repositories/plan.repository";
import { PresenceRepository } from "src/repositories/presence.repository";
import { StudentRepository } from "src/repositories/student.repository";
import { TeacherRepository } from "src/repositories/teacher.repository";
import { UserRepository } from "src/repositories/user.repository";

@Global()
@Module({
    providers: [
        PrismaService,
        StudentRepository,
        TeacherRepository,
        PresenceRepository,
        UserRepository,
        ConfigRepository,
        PlanRepository,
        EnrollmentRepository,
        PaymentMethodRepository,
        PaymentRepository
    ],
    exports: [
        StudentRepository,
        TeacherRepository,
        PresenceRepository,
        UserRepository,
        ConfigRepository,
        PlanRepository,
        EnrollmentRepository,
        PaymentMethodRepository,
        PaymentRepository
    ]
})
export class DataModule {

}