/*
  Warnings:

  - You are about to drop the column `bgColor` on the `contact_genres` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `contact_genres` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `contact_genres` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId,title]` on the table `contact_genres` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `contact_genres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_genres" DROP COLUMN "bgColor",
DROP COLUMN "label",
DROP COLUMN "value",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contact_genres_teamId_title_key" ON "contact_genres"("teamId", "title");
