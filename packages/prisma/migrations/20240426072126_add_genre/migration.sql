-- CreateEnum
CREATE TYPE "ContactGenre" AS ENUM ('RAP', 'POP', 'ROCK', 'ELECTRO', 'JAZZ', 'CLASSIC', 'REGGAE', 'BLUES', 'METAL', 'FUNK', 'SOUL', 'COUNTRY');

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "genre" "ContactGenre",
ALTER COLUMN "type" DROP NOT NULL;
