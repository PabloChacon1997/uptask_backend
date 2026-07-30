-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "expires_at" SET DEFAULT NOW() + INTERVAL '1 day';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
