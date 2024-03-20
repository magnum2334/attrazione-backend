/*
  Warnings:

  - You are about to drop the column `precio` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "precio",
DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "Talla" (
    "id" SERIAL NOT NULL,
    "nombre" INTEGER NOT NULL,

    CONSTRAINT "Talla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoTalla" (
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "productoId" INTEGER NOT NULL,
    "tallaId" INTEGER NOT NULL,

    CONSTRAINT "ProductoTalla_pkey" PRIMARY KEY ("productoId","tallaId")
);

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_tallaId_fkey" FOREIGN KEY ("tallaId") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
