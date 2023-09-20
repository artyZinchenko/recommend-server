/*
  Warnings:

  - You are about to drop the column `authorId` on the `Rate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId,userId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_authorId_fkey`;

-- AlterTable
ALTER TABLE `Rate` DROP COLUMN `authorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rate_reviewId_userId_key` ON `Rate`(`reviewId`, `userId`);

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
