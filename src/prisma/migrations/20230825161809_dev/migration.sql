/*
  Warnings:

  - The values [TV_Serie] on the enum `Review_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Review` MODIFY `type` ENUM('Book', 'Movie', 'TV_Series', 'Computer_Game', 'Music_Album', 'Board_Game', 'Mobile_App') NOT NULL;
