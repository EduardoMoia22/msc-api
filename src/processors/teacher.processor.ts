import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TeacherService } from 'services/teacher.service';

@Processor('teacher-queue')
export class TeacherProcessor {
    constructor(private readonly teacherService: TeacherService) { }

    @Process("process-teacher-creation-excel")
    public async handleTeacherCreationWithExcel(job: Job) {
        const teachers = job.data;
        try {
            for (const teacherData of teachers) {
                await this.teacherService.createTeacher(teacherData);
            }
        } catch (error) {
            Logger.error(`Error processing job ${job.id}: ${error.message}`, error.stack);
            throw error;
        }
    }

    @OnQueueActive()
    onActive(job: Job<unknown>) {
        Logger.log(`Starting job ${job.id}}`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job<unknown>) {
        Logger.log(`Job ${job.id} has been finished`);
    }

    @OnQueueFailed()
    onFailed(job: Job<unknown>, err: Error) {
        Logger.error(`Job ${job.id} failed: ${err.message}`, err.stack);
    }
}
