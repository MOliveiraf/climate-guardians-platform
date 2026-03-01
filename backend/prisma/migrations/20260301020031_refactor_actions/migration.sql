/*
  Warnings:

  - You are about to drop the column `studentId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_studentId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_sessionId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "studentId",
ADD COLUMN     "audioUrl" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "StudentAction" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "sessionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentAction" ADD CONSTRAINT "StudentAction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAction" ADD CONSTRAINT "StudentAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAction" ADD CONSTRAINT "StudentAction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
