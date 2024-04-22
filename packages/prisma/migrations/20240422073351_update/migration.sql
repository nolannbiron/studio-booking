/*
  Warnings:

  - The values [GITHUB] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FeatureType" AS ENUM ('RELEASE', 'EXPERIMENT', 'OPERATIONAL', 'KILL_SWITCH', 'PERMISSION');

-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('JWT', 'GOOGLE');
ALTER TABLE "users" ALTER COLUMN "authProvider" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "authProvider" TYPE "AuthProvider_new" USING ("authProvider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "AuthProvider_old";
ALTER TABLE "users" ALTER COLUMN "authProvider" SET DEFAULT 'JWT';
COMMIT;

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropTable
DROP TABLE "sessions";

-- CreateTable
CREATE TABLE "features" (
    "slug" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "type" "FeatureType" DEFAULT 'RELEASE',
    "stale" BOOLEAN DEFAULT false,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,

    CONSTRAINT "features_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE UNIQUE INDEX "features_slug_key" ON "features"("slug");

-- CreateIndex
CREATE INDEX "features_enabled_idx" ON "features"("enabled");

-- CreateIndex
CREATE INDEX "features_stale_idx" ON "features"("stale");
