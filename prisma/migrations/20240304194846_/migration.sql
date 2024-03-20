/*
  Warnings:

  - You are about to drop the column `productoId` on the `Orden` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orden" DROP CONSTRAINT "Orden_productoId_fkey";

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "productoId";

-- CreateTable
CREATE TABLE "OrdenDetalle" (
    "id" SERIAL NOT NULL,
    "ordenId" INTEGER NOT NULL,
    "productoId" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "OrdenDetalle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrdenDetalle" ADD CONSTRAINT "OrdenDetalle_ordenId_fkey" FOREIGN KEY ("ordenId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenDetalle" ADD CONSTRAINT "OrdenDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
