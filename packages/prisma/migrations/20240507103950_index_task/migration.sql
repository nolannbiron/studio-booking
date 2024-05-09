-- CreateIndex
CREATE INDEX "tasks_entityId_teamId_dueDate_completed_idx" ON "tasks"("entityId", "teamId", "dueDate", "completed");

-- CreateIndex
CREATE INDEX "tasks_creatorId_teamId_dueDate_completed_idx" ON "tasks"("creatorId", "teamId", "dueDate", "completed");
