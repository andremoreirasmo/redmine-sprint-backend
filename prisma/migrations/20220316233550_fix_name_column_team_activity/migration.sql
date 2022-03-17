/*
  Warnings:

  - You are about to drop the column `redmine_activit_id` on the `team_activity_redmine` table. All the data in the column will be lost.
  - Added the required column `redmine_activity_id` to the `team_activity_redmine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_activity_redmine" DROP COLUMN "redmine_activit_id",
ADD COLUMN     "redmine_activity_id" INTEGER NOT NULL;
