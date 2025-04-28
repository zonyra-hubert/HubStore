CREATE TABLE "productVariants" (
	"id" serial PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"productType" text NOT NULL,
	"updated" timestamp DEFAULT now(),
	"productId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variantTags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	"variantId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variantImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"order" real NOT NULL,
	"variantId" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantTags" ADD CONSTRAINT "variantTags_variantId_productVariants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantImages" ADD CONSTRAINT "variantImages_variantId_productVariants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;