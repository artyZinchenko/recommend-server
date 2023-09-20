/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Rate` ADD COLUMN `productId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `productId` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `Rate_productId_userId_key` ON `Rate`(`productId`, `userId`);

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
