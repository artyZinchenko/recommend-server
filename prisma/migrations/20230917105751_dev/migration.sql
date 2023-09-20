/*
  Warnings:

  - The primary key for the `Rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rate_id` on the `Rate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_userId_fkey`;

-- DropIndex
DROP INDEX `Rate_productId_userId_key` ON `Rate`;

-- AlterTable
ALTER TABLE `Rate` DROP PRIMARY KEY,
    DROP COLUMN `rate_id`,
    ADD PRIMARY KEY (`productId`, `userId`);
