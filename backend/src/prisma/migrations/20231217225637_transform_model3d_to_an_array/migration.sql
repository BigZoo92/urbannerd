/*
  Warnings:

  - The `model3D` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "model3D",
ADD COLUMN     "model3D" TEXT[] DEFAULT ARRAY[]::TEXT[];
