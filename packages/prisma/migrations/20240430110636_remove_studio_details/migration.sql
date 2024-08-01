/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studio_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_studioId_fkey";

-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_studioId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_studioId_fkey";

-- DropForeignKey
ALTER TABLE "studio_details" DROP CONSTRAINT "studio_details_teamId_fkey";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "pictures";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "studio_details";

-- DropEnum
DROP TYPE "Visibility";
