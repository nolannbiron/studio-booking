/*
  Warnings:

  - You are about to drop the column `genres` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "genres";

-- DropEnum
DROP TYPE "ContactGenre";

-- CreateTable
CREATE TABLE "contact_genres" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "contact_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreContacts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreContacts_AB_unique" ON "_GenreContacts"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreContacts_B_index" ON "_GenreContacts"("B");

-- AddForeignKey
ALTER TABLE "contact_genres" ADD CONSTRAINT "contact_genres_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreContacts" ADD CONSTRAINT "_GenreContacts_A_fkey" FOREIGN KEY ("A") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreContacts" ADD CONSTRAINT "_GenreContacts_B_fkey" FOREIGN KEY ("B") REFERENCES "contact_genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
