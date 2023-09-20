/*
  Warnings:

  - You are about to drop the column `productId` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropIndex
DROP INDEX `Rate_productId_userId_key` ON `Rate`;

-- AlterTable
ALTER TABLE `Rate` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `productId`;

-- CreateIndex
CREATE UNIQUE INDEX `Rate_userId_key` ON `Rate`(`userId`);
