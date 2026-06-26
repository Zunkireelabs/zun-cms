import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TABLE "hero_slides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"title" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"image_id" integer,
  	"video_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"type" "enum_jobs_type" DEFAULT 'full-time' NOT NULL,
  	"description" varchar NOT NULL,
  	"posted_at" timestamp(3) with time zone NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "product_domains" ADD COLUMN "installed_area_sq_ft" numeric;
  ALTER TABLE "product_domains" ADD COLUMN "metric_label" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hero_slides_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "jobs_id" integer;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_responsibilities" ADD CONSTRAINT "jobs_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hero_slides_image_idx" ON "hero_slides" USING btree ("image_id");
  CREATE INDEX "hero_slides_video_idx" ON "hero_slides" USING btree ("video_id");
  CREATE INDEX "hero_slides_updated_at_idx" ON "hero_slides" USING btree ("updated_at");
  CREATE INDEX "hero_slides_created_at_idx" ON "hero_slides" USING btree ("created_at");
  CREATE INDEX "jobs_responsibilities_order_idx" ON "jobs_responsibilities" USING btree ("_order");
  CREATE INDEX "jobs_responsibilities_parent_id_idx" ON "jobs_responsibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hero_slides_fk" FOREIGN KEY ("hero_slides_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_hero_slides_id_idx" ON "payload_locked_documents_rels" USING btree ("hero_slides_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "jobs_responsibilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hero_slides" CASCADE;
  DROP TABLE "jobs_responsibilities" CASCADE;
  DROP TABLE "jobs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hero_slides_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_jobs_fk";
  
  DROP INDEX "payload_locked_documents_rels_hero_slides_id_idx";
  DROP INDEX "payload_locked_documents_rels_jobs_id_idx";
  ALTER TABLE "product_domains" DROP COLUMN "installed_area_sq_ft";
  ALTER TABLE "product_domains" DROP COLUMN "metric_label";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hero_slides_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "jobs_id";
  DROP TYPE "public"."enum_jobs_type";`)
}
