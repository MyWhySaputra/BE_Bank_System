/*
  Warnings:

  - Made the column `updateAt` on table `bankAccounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateAt` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateAt` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateAt` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bankAccounts" ALTER COLUMN "updateAt" SET NOT NULL,
ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "updateAt" SET NOT NULL,
ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "updateAt" SET NOT NULL,
ALTER COLUMN "updateAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "updateAt" SET NOT NULL,
ALTER COLUMN "updateAt" DROP DEFAULT;
