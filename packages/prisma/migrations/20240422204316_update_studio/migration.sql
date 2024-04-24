/*
  Warnings:

  - You are about to drop the column `tags` on the `studio_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studio_details" DROP COLUMN "tags",
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "equipment" TEXT[];
