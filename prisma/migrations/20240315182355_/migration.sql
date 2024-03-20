/*
  Warnings:

  - You are about to alter the column `precio` on the `ProductoTalla` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ProductoTalla" ALTER COLUMN "precio" SET DATA TYPE INTEGER;
