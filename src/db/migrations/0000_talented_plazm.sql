CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"year_of_study" integer,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
