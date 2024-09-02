/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `tb_students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `tb_students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_students" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_students_cpf_key" ON "tb_students"("cpf");
