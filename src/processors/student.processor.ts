import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { StudentService } from 'src/services/student.service';

@Processor('student-queue')
export class StudentProcessor {
    constructor(private readonly studentService: StudentService) { }

    @Process("process-student-creation-excel")
    public async handleStudentCreationWithExcel(job: Job) {
        const students = job.data;
        try {
            for (const studentData of students) {
                await this.studentService.createStudent(studentData);
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
