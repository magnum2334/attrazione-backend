/*
  Warnings:

  - You are about to drop the `CategoriesOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_productoId_fkey";

-- DropTable
DROP TABLE "CategoriesOnPosts";

-- CreateTable
CREATE TABLE "ProductoCategaria" (
    "productoId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "ProductoCategaria_pkey" PRIMARY KEY ("productoId","categoriaId")
);

-- AddForeignKey
ALTER TABLE "ProductoCategaria" ADD CONSTRAINT "ProductoCategaria_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoCategaria" ADD CONSTRAINT "ProductoCategaria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
