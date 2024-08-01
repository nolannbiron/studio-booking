/*
  Warnings:

  - Made the column `avatarUrl` on table `contacts` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ENTITY_CREATED', 'VALUES_UPDATED', 'NOTE_ADDED');

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "avatarUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "event" JSONB NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);
