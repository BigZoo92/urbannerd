/*
  Warnings:

  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `model3D` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `videos` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images",
DROP COLUMN "model3D",
DROP COLUMN "videos",
ADD COLUMN     "files" TEXT[] DEFAULT ARRAY[]::TEXT[];
