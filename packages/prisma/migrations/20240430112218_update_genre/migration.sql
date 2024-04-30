/*
  Warnings:

  - You are about to drop the column `genre` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "genre",
ADD COLUMN     "genres" "ContactGenre"[];
