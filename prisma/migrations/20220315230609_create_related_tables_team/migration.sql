/*
  Warnings:

  - You are about to drop the column `projects_import` on the `redmine` table. All the data in the column will be lost.
  - Added the required column `project_import` to the `redmine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redmine" DROP COLUMN "projects_import",
ADD COLUMN     "project_import" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "team_activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_activity_redmine" (
    "id" TEXT NOT NULL,
    "redmine_activit_id" INTEGER NOT NULL,
    "team_activity_id" TEXT NOT NULL,

    CONSTRAINT "team_activity_redmine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_task_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "productive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_task_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_task_category_redmine" (
    "id" TEXT NOT NULL,
    "redmine_category_id" INTEGER NOT NULL,
    "team_task_category_id" TEXT NOT NULL,

    CONSTRAINT "team_task_category_redmine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team_activity" ADD CONSTRAINT "team_activity_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_activity_redmine" ADD CONSTRAINT "team_activity_redmine_team_activity_id_fkey" FOREIGN KEY ("team_activity_id") REFERENCES "team_activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_task_category" ADD CONSTRAINT "team_task_category_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_task_category_redmine" ADD CONSTRAINT "team_task_category_redmine_team_task_category_id_fkey" FOREIGN KEY ("team_task_category_id") REFERENCES "team_task_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
