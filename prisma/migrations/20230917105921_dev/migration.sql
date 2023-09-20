-- DropIndex
DROP INDEX `Rate_userId_key` ON `Rate`;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
