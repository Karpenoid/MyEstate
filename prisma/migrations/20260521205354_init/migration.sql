/*
  Warnings:

  - The `estateId` column on the `AnalyticHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `area` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baths` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailUrl` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeStatus` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgSrc` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalyticHistory" DROP COLUMN "estateId",
ADD COLUMN     "estateId" TEXT[];

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "area" INTEGER NOT NULL,
ADD COLUMN     "baths" INTEGER NOT NULL,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "daysOnZillow" INTEGER,
ADD COLUMN     "detailUrl" TEXT NOT NULL,
ADD COLUMN     "homeStatus" TEXT NOT NULL,
ADD COLUMN     "homeType" TEXT,
ADD COLUMN     "imgSrc" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "livingArea" INTEGER,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "marketingStatus" TEXT,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "taxAssessedValue" INTEGER,
ADD COLUMN     "zestimate" INTEGER,
ADD COLUMN     "zipcode" TEXT NOT NULL;
