/*
  Warnings:

  - You are about to drop the `Review_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `types` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Review_Type` DROP FOREIGN KEY `Review_Type_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Review_Type` DROP FOREIGN KEY `Review_Type_typeId_fkey`;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `types` ENUM('Books', 'Movies', 'TV_Series', 'Computer_Games', 'Music_Albums', 'Board_Games', 'Mobile_Apps') NOT NULL;

-- DropTable
DROP TABLE `Review_Type`;

-- DropTable
DROP TABLE `Type`;
