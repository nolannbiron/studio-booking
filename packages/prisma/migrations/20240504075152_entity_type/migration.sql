/*
  Warnings:

  - Added the required column `entityType` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "entityType" TEXT NOT NULL;
