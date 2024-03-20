/*
  Warnings:

  - Added the required column `tallaId` to the `OrdenDetalle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdenDetalle" ADD COLUMN     "tallaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrdenDetalle" ADD CONSTRAINT "OrdenDetalle_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
