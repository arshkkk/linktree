/*
  Warnings:

  - You are about to drop the column `linkTreePageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LinkTreePage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_linkTreePageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_linkTreePageId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "position" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkTreePageId";

-- DropTable
DROP TABLE "LinkTreePage";

-- CreateTable
CREATE TABLE "LinkTree" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LinkTree_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkTree_userId_key" ON "LinkTree"("userId");

-- AddForeignKey
ALTER TABLE "LinkTree" ADD CONSTRAINT "LinkTree_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_linkTreePageId_fkey" FOREIGN KEY ("linkTreePageId") REFERENCES "LinkTree"("id") ON DELETE SET NULL ON UPDATE CASCADE;
