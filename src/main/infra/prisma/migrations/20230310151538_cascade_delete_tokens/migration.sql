-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_usersId_fkey";

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
