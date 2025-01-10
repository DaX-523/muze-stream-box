/*
  Warnings:

  - The primary key for the `CurrentTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CurrentTrack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CurrentTrack" DROP CONSTRAINT "CurrentTrack_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CurrentTrack_pkey" PRIMARY KEY ("streamId", "trackId");
