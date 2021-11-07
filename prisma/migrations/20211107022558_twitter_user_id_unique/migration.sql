/*
  Warnings:

  - A unique constraint covering the columns `[twitterUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_twitterUserId_key" ON "User"("twitterUserId");
