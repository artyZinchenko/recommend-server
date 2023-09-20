/*
  Warnings:

  - The values [Books,Movies,TV_Series,Computer_Games,Music_Albums,Board_Games,Mobile_Apps] on the enum `Review_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Review` MODIFY `type` ENUM('Book', 'Movie', 'TV_Serie', 'Computer_Game', 'Music_Album', 'Board_Game', 'Mobile_App') NOT NULL;
