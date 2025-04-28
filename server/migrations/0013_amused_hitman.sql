ALTER TABLE "productVariants" DROP CONSTRAINT "productVariants_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariants" ADD COLUMN "productID" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariants" ADD CONSTRAINT "productVariants_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariants" DROP COLUMN "productId";