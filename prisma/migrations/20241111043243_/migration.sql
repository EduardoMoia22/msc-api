-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('pending', 'paid', 'overdue');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountsPayable" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "estimatedValue" DOUBLE PRECISION NOT NULL,
    "actualValue" DOUBLE PRECISION,
    "status" "AccountStatus" NOT NULL,
    "notes" TEXT,
    "reminder" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "AccountsPayable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountsPayable" ADD CONSTRAINT "AccountsPayable_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
