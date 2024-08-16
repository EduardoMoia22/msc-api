/*
  Warnings:

  - You are about to drop the column `userId` on the `tb_presences` table. All the data in the column will be lost.
  - You are about to drop the `tb_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentId` to the `tb_presences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_presences" DROP CONSTRAINT "tb_presences_userId_fkey";

-- AlterTable
ALTER TABLE "tb_presences" DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tb_users";

-- CreateTable
CREATE TABLE "tb_students" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_students_email_key" ON "tb_students"("email");

-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "tb_students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
