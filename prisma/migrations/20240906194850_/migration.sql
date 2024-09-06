/*
  Warnings:

  - Added the required column `quantityOfClasses` to the `tb_presences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_presences" ADD COLUMN     "quantityOfClasses" INTEGER NOT NULL;
