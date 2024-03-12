/*
  Warnings:

  - Added the required column `urlImg` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "urlImg" TEXT NOT NULL;
