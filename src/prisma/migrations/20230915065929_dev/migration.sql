/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Rate` table. All the data in the column will be lost.
  - You are about to drop the column `average_rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,userId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_reviewId_fkey`;

-- DropIndex
DROP INDEX `Rate_reviewId_userId_key` ON `Rate`;

-- DropIndex
DROP INDEX `Review_name_text_product_idx` ON `Review`;

-- AlterTable
ALTER TABLE `Rate` DROP COLUMN `reviewId`,
    ADD COLUMN `productId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `average_rating`,
    DROP COLUMN `product`,
    DROP COLUMN `type`,
    ADD COLUMN `productId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(60) NOT NULL,
    `type` ENUM('Book', 'Movie', 'TV_Series', 'Computer_Game', 'Music_Album', 'Board_Game', 'Mobile_App', 'Other') NOT NULL,
    `average_rating` DOUBLE NOT NULL DEFAULT 0.0,

    FULLTEXT INDEX `Product_product_name_idx`(`product_name`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Rate_productId_userId_key` ON `Rate`(`productId`, `userId`);

-- CreateIndex
CREATE FULLTEXT INDEX `Review_name_text_idx` ON `Review`(`name`, `text`);

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
