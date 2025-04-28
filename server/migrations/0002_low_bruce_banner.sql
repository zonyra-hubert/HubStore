CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "twofactorEnabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "roles" DEFAULT 'user';