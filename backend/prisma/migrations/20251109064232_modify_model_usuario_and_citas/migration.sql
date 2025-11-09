/*
  Warnings:

  - A unique constraint covering the columns `[walletAddress]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `keyId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateKeyPath` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "debitAmount" TEXT,
ADD COLUMN     "incomingPaymentId" TEXT,
ADD COLUMN     "quoteId" TEXT,
ADD COLUMN     "receiveAmount" TEXT;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "keyId" TEXT NOT NULL,
ADD COLUMN     "privateKeyPath" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_walletAddress_key" ON "Usuario"("walletAddress");
