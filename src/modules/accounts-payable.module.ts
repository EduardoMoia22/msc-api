import { Module } from "@nestjs/common";
import { AccountsPayableController } from "src/controllers/accounts-payable.controller";
import { AccountsPayableService } from "src/services/accounts-payable.service";
import { AccountCategoryModule } from "./account-category.module";

@Module({
    imports: [AccountCategoryModule],
    controllers: [AccountsPayableController],
    providers: [AccountsPayableService],
    exports: [AccountsPayableService]
})
export class AccountsPayableModule { }