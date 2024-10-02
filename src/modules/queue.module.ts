import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: process.env.REDISHOST,
                port: parseInt(process.env.REDISPORT) || 6379,
                username: process.env.REDISUSER,
                password: process.env.REDISPASSWORD
            },
        }),
        BullModule.registerQueue({
            name: 'student-queue',
        }),
        BullModule.registerQueue({
            name: 'teacher-queue',
        }),
    ],
    exports: [BullModule],
})
export class QueueModule { }
