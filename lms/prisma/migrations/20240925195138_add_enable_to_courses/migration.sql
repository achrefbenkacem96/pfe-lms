/*
  Warnings:

  - You are about to drop the column `statisticsId` on the `question` table. All the data in the column will be lost.
  - You are about to alter the column `correctAnswer` on the `question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `platformFee` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherRevenue` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `enable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `platformFee` DOUBLE NOT NULL,
    ADD COLUMN `teacherRevenue` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `statisticsId`,
    MODIFY `correctAnswer` INTEGER NOT NULL,
    MODIFY `quizId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `statistics` ADD COLUMN `questionId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `enable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN', 'STUDENT', 'TEACHER', 'SUPPORT') NOT NULL DEFAULT 'STUDENT';
