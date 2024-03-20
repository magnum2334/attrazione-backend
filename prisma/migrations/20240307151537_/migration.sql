/*
  Warnings:

  - Made the column `productoId` on table `OrdenDetalle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrdenDetalle" DROP CONSTRAINT "OrdenDetalle_productoId_fkey";

-- AlterTable
ALTER TABLE "OrdenDetalle" ALTER COLUMN "productoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrdenDetalle" ADD CONSTRAINT "OrdenDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
