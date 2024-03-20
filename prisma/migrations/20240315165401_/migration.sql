/*
  Warnings:

  - You are about to alter the column `total` on the `Orden` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Orden" ALTER COLUMN "total" SET DATA TYPE INTEGER;
