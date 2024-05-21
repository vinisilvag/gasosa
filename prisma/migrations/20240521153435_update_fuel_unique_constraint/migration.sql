/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `fuels` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "fuels_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "fuels_id_name_key" ON "fuels"("id", "name");
