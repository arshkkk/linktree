/*
  Warnings:

  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - Added the required column `linkTreePageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "userId",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkTreePageId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "linkTreePageId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'NOT_SET';

-- CreateTable
CREATE TABLE "LinkTreePage" (
    "id" TEXT NOT NULL,

    CONSTRAINT "LinkTreePage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_linkTreePageId_fkey" FOREIGN KEY ("linkTreePageId") REFERENCES "LinkTreePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_linkTreePageId_fkey" FOREIGN KEY ("linkTreePageId") REFERENCES "LinkTreePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
