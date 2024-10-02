import { Module } from "@nestjs/common";
import { ExcelReaderService } from "src/services/excel-reader.service";

@Module({
    providers: [ExcelReaderService],
    exports: [ExcelReaderService],
  })
export class ExcelReaderModule { }
