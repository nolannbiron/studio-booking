/*
  Warnings:

  - Made the column `entityId` on table `notes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entityType` on table `notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "entityId" SET NOT NULL,
ALTER COLUMN "entityType" SET NOT NULL;
