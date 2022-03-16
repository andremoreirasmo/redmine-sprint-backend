/*
  Warnings:

  - You are about to drop the column `project_import` on the `redmine` table. All the data in the column will be lost.
  - Added the required column `projects_import` to the `redmine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redmine" DROP COLUMN "project_import",
ADD COLUMN     "projects_import" INTEGER NOT NULL;
