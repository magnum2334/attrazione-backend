/*
  Warnings:

  - Added the required column `ciudadId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentoId` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "ciudadId" INTEGER NOT NULL,
ADD COLUMN     "departamentoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_ciudadId_fkey" FOREIGN KEY ("ciudadId") REFERENCES "Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
