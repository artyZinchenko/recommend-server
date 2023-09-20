/*
  Warnings:

  - You are about to drop the column `types` on the `Review` table. All the data in the column will be lost.
  - Added the required column `type` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Review` DROP COLUMN `types`,
    ADD COLUMN `type` ENUM('Books', 'Movies', 'TV_Series', 'Computer_Games', 'Music_Albums', 'Board_Games', 'Mobile_Apps') NOT NULL;
