/*
  Warnings:

  - Changed the type of `status` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('Unconfirmed', 'WithoutPlan', 'Student', 'Essential', 'Advanced');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "StatusUser" NOT NULL;
