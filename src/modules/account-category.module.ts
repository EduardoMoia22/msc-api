import { Module } from "@nestjs/common";
import { AccountCategoryService } from "src/services/account-category.service";

@Module({
    providers: [AccountCategoryService],
    exports: [AccountCategoryService]
})
export class AccountCategoryModule { }