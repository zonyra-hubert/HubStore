CREATE TABLE "password_reset_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "two_factor_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL
);
