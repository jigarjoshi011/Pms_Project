-- AlterTable
ALTER TABLE `Users` MODIFY `created_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users_has_Roles` MODIFY `roleId` INTEGER NOT NULL DEFAULT 2;
