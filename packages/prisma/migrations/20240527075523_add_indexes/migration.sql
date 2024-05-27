-- CreateIndex
CREATE INDEX "bookings_teamId_contactId_startDate_endDate_idx" ON "bookings"("teamId", "contactId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "bookings_teamId_ownerId_startDate_endDate_idx" ON "bookings"("teamId", "ownerId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "bookings_teamId_status_idx" ON "bookings"("teamId", "status");

-- CreateIndex
CREATE INDEX "bookings_teamId_startDate_endDate_idx" ON "bookings"("teamId", "startDate", "endDate");
