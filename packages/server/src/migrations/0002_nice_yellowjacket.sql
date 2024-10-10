ALTER TABLE "locations" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "accesses" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;