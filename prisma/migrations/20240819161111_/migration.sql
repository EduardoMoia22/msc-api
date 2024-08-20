-- AddForeignKey
ALTER TABLE "tb_presences" ADD CONSTRAINT "tb_presences_classId_fkey" FOREIGN KEY ("classId") REFERENCES "tb_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
