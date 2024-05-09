/*
  Warnings:

  - A unique constraint covering the columns `[userEmail,teamId]` on the table `memberships` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `memberships` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "memberships_userId_idx";

-- AlterTable
ALTER TABLE "memberships" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "memberships_userEmail_idx" ON "memberships"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userEmail_teamId_key" ON "memberships"("userEmail", "teamId");
