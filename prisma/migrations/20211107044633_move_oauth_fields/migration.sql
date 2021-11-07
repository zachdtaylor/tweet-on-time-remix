/*
  Warnings:

  - You are about to drop the column `oauthToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `oauthTokenSecret` on the `Session` table. All the data in the column will be lost.
  - Added the required column `oauthToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oauthTokenSecret` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "oauthToken",
DROP COLUMN "oauthTokenSecret";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauthToken" TEXT NOT NULL,
ADD COLUMN     "oauthTokenSecret" TEXT NOT NULL;
