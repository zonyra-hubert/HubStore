ALTER TABLE "products" RENAME COLUMN "created_at" TO "created";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE real;