/*
  Warnings:

  - You are about to drop the column `email` on the `organizers` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `organizers` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `organizers` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `organizers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `volunteers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `organizers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `volunteers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `organizers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `volunteers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ORGANIZER', 'VOLUNTEER');

-- DropIndex
DROP INDEX "organizers_email_key";

-- DropIndex
DROP INDEX "volunteers_email_key";

-- AlterTable
ALTER TABLE "organizers" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "passwordHash",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "volunteers" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "passwordHash",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizers_userId_key" ON "organizers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "volunteers_userId_key" ON "volunteers"("userId");

-- AddForeignKey
ALTER TABLE "organizers" ADD CONSTRAINT "organizers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
