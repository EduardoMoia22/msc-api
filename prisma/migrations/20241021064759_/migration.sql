/*
  Warnings:

  - You are about to drop the column `monthlyFee` on the `tb_enrollments` table. All the data in the column will be lost.
  - Added the required column `monthlyFeeGross` to the `tb_enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyFeeNet` to the `tb_enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_enrollments" DROP COLUMN "monthlyFee",
ADD COLUMN     "monthlyFeeGross" INTEGER NOT NULL,
ADD COLUMN     "monthlyFeeNet" INTEGER NOT NULL;
