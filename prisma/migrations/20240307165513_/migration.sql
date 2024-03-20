-- DropForeignKey
ALTER TABLE "OrdenDetalle" DROP CONSTRAINT "OrdenDetalle_productoId_fkey";

-- AlterTable
ALTER TABLE "OrdenDetalle" ALTER COLUMN "productoId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Carrito" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarritoDetalle" (
    "id" SERIAL NOT NULL,
    "carritoId" INTEGER NOT NULL,
    "productoId" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "CarritoDetalle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrdenDetalle" ADD CONSTRAINT "OrdenDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoDetalle" ADD CONSTRAINT "CarritoDetalle_carritoId_fkey" FOREIGN KEY ("carritoId") REFERENCES "Carrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoDetalle" ADD CONSTRAINT "CarritoDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
