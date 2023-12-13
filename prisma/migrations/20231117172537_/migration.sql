/*
  Warnings:

  - You are about to alter the column `time` on the `statistics_pulse` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `serialNumber_device` MODIFY `number` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `statistics_pulse` MODIFY `time` DATETIME NOT NULL;
