-- CreateEnum
CREATE TYPE "DiscountTypeEnum" AS ENUM ('FIXED', 'PERCENTAGE');

-- AlterTable
ALTER TABLE "tb_enrollments" ADD COLUMN     "discountType" "DiscountTypeEnum";
