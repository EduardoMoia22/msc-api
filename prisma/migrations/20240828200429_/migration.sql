/*
  Warnings:

  - A unique constraint covering the columns `[rm]` on the table `tb_students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryDate` to the `tb_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rm` to the `tb_students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_students" ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rm" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_students_rm_key" ON "tb_students"("rm");
