-- DropIndex
DROP INDEX "bookings_teamId_contactId_startDate_endDate_idx";

-- DropIndex
DROP INDEX "bookings_teamId_ownerId_startDate_endDate_idx";

-- DropIndex
DROP INDEX "bookings_teamId_startDate_endDate_idx";

-- DropIndex
DROP INDEX "bookings_teamId_status_idx";

-- CreateIndex
CREATE INDEX "bookings_teamId_startDate_status_idx" ON "bookings"("teamId", "startDate", "status");

-- CreateIndex
CREATE INDEX "bookings_teamId_ownerId_contactId_startDate_status_idx" ON "bookings"("teamId", "ownerId", "contactId", "startDate", "status");

-- CreateIndex
CREATE INDEX "bookings_teamId_ownerId_startDate_status_idx" ON "bookings"("teamId", "ownerId", "startDate", "status");

-- CreateIndex
CREATE INDEX "bookings_teamId_contactId_startDate_status_idx" ON "bookings"("teamId", "contactId", "startDate", "status");
