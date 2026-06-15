-- AlterEnum
ALTER TYPE "OutboxStatus" ADD VALUE 'PROCESSING';

-- AlterTable
ALTER TABLE "OutboxEvent" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0;
