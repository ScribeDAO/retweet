-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `_PostToTag` DROP FOREIGN KEY `_posttotag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_PostToTag` DROP FOREIGN KEY `_posttotag_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_RolesToUser` DROP FOREIGN KEY `_rolestouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_RolesToUser` DROP FOREIGN KEY `_rolestouser_ibfk_2`;

-- CreateTable
CREATE TABLE `_TagToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TagToUser_AB_unique`(`A`, `B`),
    INDEX `_TagToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
