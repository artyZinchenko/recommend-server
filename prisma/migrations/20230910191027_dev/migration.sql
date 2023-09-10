-- CreateIndex
CREATE FULLTEXT INDEX `Comment_comment_text_idx` ON `Comment`(`comment_text`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_tag_name_idx` ON `Tag`(`tag_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_user_name_idx` ON `User`(`user_name`);
