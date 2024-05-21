/*
  Warnings:

  - You are about to drop the column `gas_price` on the `gas_stations` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `gas_stations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "likes" (
    "userId" INTEGER NOT NULL,
    "gasStationId" INTEGER NOT NULL,
    CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "likes_gasStationId_fkey" FOREIGN KEY ("gasStationId") REFERENCES "gas_stations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fuels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "gasStationId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "fuels_gasStationId_fkey" FOREIGN KEY ("gasStationId") REFERENCES "gas_stations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gas_stations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_gas_stations" ("email", "id", "latitude", "longitude", "name", "password") SELECT "email", "id", "latitude", "longitude", "name", "password" FROM "gas_stations";
DROP TABLE "gas_stations";
ALTER TABLE "new_gas_stations" RENAME TO "gas_stations";
CREATE UNIQUE INDEX "gas_stations_email_key" ON "gas_stations"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_gasStationId_key" ON "likes"("userId", "gasStationId");

-- CreateIndex
CREATE UNIQUE INDEX "fuels_name_key" ON "fuels"("name");
