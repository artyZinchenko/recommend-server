/*
  Warnings:

  - You are about to drop the column `picture` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Review` DROP COLUMN `picture`,
    ADD COLUMN `images` JSON NULL,
    MODIFY `type` ENUM('Book', 'Movie', 'TV_Series', 'Computer_Game', 'Music_Album', 'Board_Game', 'Mobile_App', 'Other') NOT NULL;
