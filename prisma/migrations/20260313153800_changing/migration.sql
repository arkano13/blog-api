/*
  Warnings:

  - You are about to drop the column `LastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `Lastname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "LastName",
DROP COLUMN "firstName",
ADD COLUMN     "Lastname" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL;
