/*
  Warnings:

  - The primary key for the `tb_payment_methods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tb_payment_methods` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `paymentMethodId` on the `tb_payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tb_payments" DROP CONSTRAINT "tb_payments_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "tb_payment_methods" DROP CONSTRAINT "tb_payment_methods_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_payment_methods_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tb_payments" DROP COLUMN "paymentMethodId",
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "tb_payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
