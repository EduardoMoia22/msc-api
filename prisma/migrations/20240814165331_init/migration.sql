/*
  Warnings:

  - Added the required column `endAt` to the `tb_presences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_presences" ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
