import { Module } from "@nestjs/common";
import { ExcelReaderService } from "services/excel-reader.service";

@Module({
    providers: [ExcelReaderService],
    exports: [ExcelReaderService],
  })
export class ExcelReaderModule { }
