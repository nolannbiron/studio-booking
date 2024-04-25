/*
  Warnings:

  - A unique constraint covering the columns `[teamId,userId]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_teamId_userId_key" ON "contacts"("teamId", "userId");
