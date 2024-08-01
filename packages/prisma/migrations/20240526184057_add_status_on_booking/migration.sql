-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';
