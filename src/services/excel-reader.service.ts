import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { readFileSync, unlinkSync } from 'fs';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ExcelReaderService {
    private readonly filePath: string = process.env.FILE_PATH || process.env.RAILWAY_VOLUME_MOUNT_PATH;

    async readExcelFile<T extends Object>(fileName: string, dtoClass: new () => T): Promise<T[]> {
        try {
            const file = readFileSync(`${this.filePath}/${fileName}`);
            const workbook = xlsx.read(file, { type: 'buffer' });
            const sheetNames = workbook.SheetNames;
            const data: T[] = [];

            for (const sheetName of sheetNames) {
                const sheet = workbook.Sheets[sheetName];
                const jsonData: unknown[] = xlsx.utils.sheet_to_json(sheet);

                for (const item of jsonData) {
                    const dtoInstance = plainToClass(dtoClass, item);
                    const errors = await validate(dtoInstance);

                    if (errors.length > 0) {
                        throw new Error(`Erro de validação: ${errors.map(e => Object.values(e.constraints)).join(', ')}`);
                    }

                    data.push(dtoInstance);
                }
            }

            this.deleteExcelFile(fileName);

            return data;
        } catch (error) {
            this.deleteExcelFile(fileName);
            console.error('Erro ao ler o arquivo Excel:', error);
            throw new HttpException(`Erro ao ler o arquivo Excel. ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    private deleteExcelFile(fileName: string): void {
        try {
            unlinkSync(`${this.filePath}/${fileName}`);
            console.log(`Arquivo ${fileName} excluído com sucesso.`);
        } catch (error) {
            console.error(`Erro ao excluir o arquivo ${fileName}:`, error);
            throw new Error(`Erro ao excluir o arquivo ${fileName}`);
        }
    }
}

