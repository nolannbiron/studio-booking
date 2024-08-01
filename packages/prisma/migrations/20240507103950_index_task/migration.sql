-- CreateIndex
CREATE INDEX "tasks_entityId_teamId_dueDate_completed_idx" ON "tasks"("entityId", "teamId", "dueDate", "completed");

-- CreateIndex
CREATE INDEX "tasks_ownerId_teamId_dueDate_completed_idx" ON "tasks"("ownerId", "teamId", "dueDate", "completed");
