/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_name_key" ON "Video"("name");
