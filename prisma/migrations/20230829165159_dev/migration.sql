-- CreateTable
CREATE TABLE `Comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_text` LONGTEXT NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reviewId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
