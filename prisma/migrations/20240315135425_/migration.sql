/*
  Warnings:

  - Added the required column `tallaId` to the `CarritoDetalle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarritoDetalle" ADD COLUMN     "tallaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CarritoDetalle" ADD CONSTRAINT "CarritoDetalle_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
