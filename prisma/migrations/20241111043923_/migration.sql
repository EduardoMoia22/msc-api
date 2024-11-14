/*
  Warnings:

  - You are about to drop the `AccountsPayable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "tb_account_status" AS ENUM ('pending', 'paid', 'overdue');

-- DropForeignKey
ALTER TABLE "AccountsPayable" DROP CONSTRAINT "AccountsPayable_categoryId_fkey";

-- DropTable
DROP TABLE "AccountsPayable";

-- DropTable
DROP TABLE "Category";

-- DropEnum
DROP TYPE "AccountStatus";

-- CreateTable
CREATE TABLE "tb_account_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "tb_account_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_accounts_payable" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "estimatedValue" DOUBLE PRECISION NOT NULL,
    "actualValue" DOUBLE PRECISION,
    "status" "tb_account_status" NOT NULL,
    "notes" TEXT,
    "reminderEnabled" BOOLEAN NOT NULL,
    "reminderDaysBefore" INTEGER,
    "accountCategoryId" TEXT NOT NULL,

    CONSTRAINT "tb_accounts_payable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_accounts_payable" ADD CONSTRAINT "tb_accounts_payable_accountCategoryId_fkey" FOREIGN KEY ("accountCategoryId") REFERENCES "tb_account_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
