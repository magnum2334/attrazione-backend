/*
  Warnings:

  - Added the required column `image` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "image" TEXT NOT NULL;
