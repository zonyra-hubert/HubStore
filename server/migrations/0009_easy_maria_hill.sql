ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "two_factor_tokens" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "two_factor_tokens" ADD CONSTRAINT "two_factor_tokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;