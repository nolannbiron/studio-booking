/*
  Warnings:

  - The values [GROUP,COMPANY] on the enum `ContactType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactType_new" AS ENUM ('ARTIST', 'BAND', 'LABEL', 'MANAGER');
ALTER TABLE "contacts" ALTER COLUMN "type" TYPE "ContactType_new" USING ("type"::text::"ContactType_new");
ALTER TYPE "ContactType" RENAME TO "ContactType_old";
ALTER TYPE "ContactType_new" RENAME TO "ContactType";
DROP TYPE "ContactType_old";
COMMIT;
