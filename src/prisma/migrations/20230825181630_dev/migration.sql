/*
  Warnings:

  - A unique constraint covering the columns `[tag_name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tag_tag_name_key` ON `Tag`(`tag_name`);
