/*
  Warnings:

  - The values [ELECTRO,CLASSIC,METAL,FUNK] on the enum `ContactGenre` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactGenre_new" AS ENUM ('BLUES', 'CLASSICAL', 'COUNTRY', 'DANCE', 'ELECTRONIC', 'HIP_HOP', 'JAZZ', 'POP', 'RAP', 'REGGAE', 'ROCK', 'SOUL', 'OTHERS');
ALTER TABLE "contacts" ALTER COLUMN "genre" TYPE "ContactGenre_new" USING ("genre"::text::"ContactGenre_new");
ALTER TYPE "ContactGenre" RENAME TO "ContactGenre_old";
ALTER TYPE "ContactGenre_new" RENAME TO "ContactGenre";
DROP TYPE "ContactGenre_old";
COMMIT;
