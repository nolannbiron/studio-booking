-- CreateIndex
CREATE INDEX "notes_entityId_idx" ON "notes"("entityId");

-- CreateIndex
CREATE INDEX "notes_teamId_idx" ON "notes"("teamId");

-- CreateIndex
CREATE INDEX "notes_ownerId_idx" ON "notes"("ownerId");

-- CreateIndex
CREATE INDEX "notes_entityId_entityType_idx" ON "notes"("entityId", "entityType");
