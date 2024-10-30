-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'pending', 'overdue');

-- CreateTable
CREATE TABLE "tb_payments" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "discount" INTEGER,
    "lateFee" INTEGER,

    CONSTRAINT "tb_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_payment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "tb_enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "tb_payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
