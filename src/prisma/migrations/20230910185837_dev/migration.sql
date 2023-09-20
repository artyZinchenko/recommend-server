-- CreateIndex
CREATE FULLTEXT INDEX `Review_name_text_product_idx` ON `Review`(`name`, `text`, `product`);
