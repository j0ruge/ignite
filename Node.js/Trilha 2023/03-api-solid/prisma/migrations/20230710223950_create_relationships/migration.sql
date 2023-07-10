/*
  Warnings:

  - Added the required column `fk_gym_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "fk_gym_id" TEXT NOT NULL,
ADD COLUMN     "fk_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_fk_gym_id_fkey" FOREIGN KEY ("fk_gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
