-- AlterTable
CREATE SEQUENCE upvote_id_seq;
ALTER TABLE "Upvote" ALTER COLUMN "id" SET DEFAULT nextval('upvote_id_seq');
ALTER SEQUENCE upvote_id_seq OWNED BY "Upvote"."id";
