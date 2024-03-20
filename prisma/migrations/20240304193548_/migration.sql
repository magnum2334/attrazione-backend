/*
  Warnings:

  - You are about to drop the column `ordenId` on the `Producto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_ordenId_fkey";

-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "productoId" INTEGER;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "ordenId";

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
