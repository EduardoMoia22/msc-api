-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('active', 'inactive', 'canceled');

-- CreateTable
CREATE TABLE "tb_enrollments" (
    "id" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "EnrollmentStatus" NOT NULL,
    "monthlyFee" INTEGER NOT NULL,
    "discount" INTEGER,
    "lateFee" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_enrollments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_enrollments" ADD CONSTRAINT "tb_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "tb_students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_enrollments" ADD CONSTRAINT "tb_enrollments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "tb_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
