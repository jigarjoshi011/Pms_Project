-- AlterTable
ALTER TABLE `Categories` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `Quantity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `description` VARCHAR(191) NULL;
