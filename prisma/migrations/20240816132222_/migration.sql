-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);
