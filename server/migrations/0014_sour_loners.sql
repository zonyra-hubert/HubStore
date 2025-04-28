ALTER TABLE "variantTags" RENAME COLUMN "variantId" TO "variantID";--> statement-breakpoint
ALTER TABLE "variantImages" RENAME COLUMN "variantId" TO "name";--> statement-breakpoint
ALTER TABLE "variantTags" DROP CONSTRAINT "variantTags_variantId_productVariants_id_fk";
--> statement-breakpoint
ALTER TABLE "variantImages" DROP CONSTRAINT "variantImages_variantId_productVariants_id_fk";
--> statement-breakpoint
ALTER TABLE "variantImages" ADD COLUMN "variantID" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "variantTags" ADD CONSTRAINT "variantTags_variantID_productVariants_id_fk" FOREIGN KEY ("variantID") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantImages" ADD CONSTRAINT "variantImages_variantID_productVariants_id_fk" FOREIGN KEY ("variantID") REFERENCES "public"."productVariants"("id") ON DELETE cascade ON UPDATE no action;