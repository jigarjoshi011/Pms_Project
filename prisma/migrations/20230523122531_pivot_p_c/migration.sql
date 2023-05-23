/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Products` DROP FOREIGN KEY `Products_categoriesId_fkey`;

-- AlterTable
ALTER TABLE `Products` DROP COLUMN `categoriesId`;

-- CreateTable
CREATE TABLE `ProductsOnCategories` (
    `p_Id` INTEGER NOT NULL,
    `c_Id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`p_Id`, `c_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductsOnCategories` ADD CONSTRAINT `ProductsOnCategories_p_Id_fkey` FOREIGN KEY (`p_Id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsOnCategories` ADD CONSTRAINT `ProductsOnCategories_c_Id_fkey` FOREIGN KEY (`c_Id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
