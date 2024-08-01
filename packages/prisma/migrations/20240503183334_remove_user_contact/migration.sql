/*
  Warnings:

  - You are about to drop the column `userId` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContactType" ADD VALUE 'CAMERAMAN';
ALTER TYPE "ContactType" ADD VALUE 'PHOTOGRAPHER';

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropIndex
DROP INDEX "contacts_teamId_userId_key";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "userId",
ADD COLUMN     "avatarColor" TEXT;
