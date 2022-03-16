/*
  Warnings:

  - Added the required column `name` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" ADD COLUMN     "name" TEXT NOT NULL;
