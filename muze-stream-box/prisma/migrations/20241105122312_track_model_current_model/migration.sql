/*
  Warnings:

  - You are about to drop the column `extractedId` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "extractedId",
ADD COLUMN     "activeMembers" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "played" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentTrack" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "CurrentTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackUpvote" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TrackUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackUpvote_userId_trackId_key" ON "TrackUpvote"("userId", "trackId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentTrack" ADD CONSTRAINT "CurrentTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentTrack" ADD CONSTRAINT "CurrentTrack_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackUpvote" ADD CONSTRAINT "TrackUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackUpvote" ADD CONSTRAINT "TrackUpvote_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
