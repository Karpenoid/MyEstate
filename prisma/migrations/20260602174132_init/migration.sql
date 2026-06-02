/*
  Warnings:

  - You are about to drop the `AnalyticHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalyticHistory" DROP CONSTRAINT "AnalyticHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropTable
DROP TABLE "AnalyticHistory";

-- DropTable
DROP TABLE "Favorite";
