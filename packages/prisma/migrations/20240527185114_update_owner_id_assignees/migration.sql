/*
  Warnings:

  - You are about to drop the column `ownerId` on the `bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_ownerId_fkey";

-- DropIndex
DROP INDEX "bookings_teamId_ownerId_contactId_startDate_status_idx";

-- DropIndex
DROP INDEX "bookings_teamId_ownerId_startDate_status_idx";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "_AssignedBookings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssignedBookings_AB_unique" ON "_AssignedBookings"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignedBookings_B_index" ON "_AssignedBookings"("B");

-- AddForeignKey
ALTER TABLE "_AssignedBookings" ADD CONSTRAINT "_AssignedBookings_A_fkey" FOREIGN KEY ("A") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignedBookings" ADD CONSTRAINT "_AssignedBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
