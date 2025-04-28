CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
