-- CreateTable
CREATE TABLE `AccessToken` (
    `token` VARCHAR(191) NOT NULL,
    `provider` ENUM('FACEBOOK', 'TWITTER', 'NONE') NOT NULL DEFAULT 'NONE',
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`token`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
