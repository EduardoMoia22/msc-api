/*
  Warnings:

  - Added the required column `classId` to the `tb_presences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_presences" DROP CONSTRAINT "tb_presences_studentId_fkey";

-- DropForeignKey
ALTER TABLE "tb_presences" DROP CONSTRAINT "tb_presences_teacherId_fkey";

-- AlterTable
ALTER TABLE "tb_presences" ADD COLUMN     "classId" INTEGER NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL,
ALTER COLUMN "studentId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tb_classes" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassStudents" (
    "classId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "ClassStudents_pkey" PRIMARY KEY ("classId","studentId")
);

-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "tb_students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "tb_teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_classes" ADD CONSTRAINT "tb_classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "tb_teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_classId_fkey" FOREIGN KEY ("classId") REFERENCES "tb_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "tb_students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
