/*
  Warnings:

  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_authorId_fkey`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `authorId`;
