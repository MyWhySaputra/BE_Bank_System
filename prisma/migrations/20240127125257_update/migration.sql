-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destination_bank_number_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_source_bank_number_fkey";

-- AlterTable
ALTER TABLE "bankAccounts" ALTER COLUMN "bank_account_number" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "source_bank_number" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "destination_bank_number" SET DATA TYPE VARCHAR(100);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_bank_number_fkey" FOREIGN KEY ("source_bank_number") REFERENCES "bankAccounts"("bank_account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_bank_number_fkey" FOREIGN KEY ("destination_bank_number") REFERENCES "bankAccounts"("bank_account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
