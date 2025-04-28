CREATE TABLE "email_token" (
	"identifier" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
