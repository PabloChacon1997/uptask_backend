/*
  Warnings:

  - Added the required column `managerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "managerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "expires_at" SET DEFAULT NOW() + INTERVAL '1 day';

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
