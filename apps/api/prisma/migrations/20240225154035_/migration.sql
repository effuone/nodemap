/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_volunteers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `volunteers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROCESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "organizers" DROP CONSTRAINT "organizers_userId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_taskId_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "task_volunteers" DROP CONSTRAINT "task_volunteers_taskId_fkey";

-- DropForeignKey
ALTER TABLE "task_volunteers" DROP CONSTRAINT "task_volunteers_volunteerId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_eventId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "volunteers" DROP CONSTRAINT "volunteers_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "organizers";

-- DropTable
DROP TABLE "ratings";

-- DropTable
DROP TABLE "task_volunteers";

-- DropTable
DROP TABLE "tasks";

-- DropTable
DROP TABLE "volunteers";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Roadmap" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "roadmapId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
