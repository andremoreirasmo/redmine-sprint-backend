-- CreateTable
CREATE TABLE "team_redmine_user" (
    "id" TEXT NOT NULL,
    "redmine_user_import_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "team_redmine_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team_redmine_user" ADD CONSTRAINT "team_redmine_user_redmine_user_import_id_fkey" FOREIGN KEY ("redmine_user_import_id") REFERENCES "redmine_user_import"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_redmine_user" ADD CONSTRAINT "team_redmine_user_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
