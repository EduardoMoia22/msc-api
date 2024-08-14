-- CreateTable
CREATE TABLE "tb_presences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "tb_presences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "tb_teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
