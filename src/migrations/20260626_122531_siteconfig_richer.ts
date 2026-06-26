import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_config_core_values_icon" AS ENUM('Target', 'Eye', 'Shield', 'Users', 'Award', 'Handshake', 'CheckCircle', 'TrendingUp', 'Globe', 'Layers', 'Sparkles', 'HeartPulse', 'Building2');
  CREATE TYPE "public"."enum_site_config_why_work_with_us_icon" AS ENUM('Sparkles', 'Award', 'Users', 'TrendingUp', 'Globe', 'Layers', 'Building2', 'HeartPulse');
  CREATE TYPE "public"."enum_site_config_contracting_services_icon" AS ENUM('Hammer', 'Wrench', 'Building2', 'Sparkles', 'Layers', 'Briefcase');
  CREATE TABLE "site_config_showrooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"address" varchar
  );
  
  CREATE TABLE "site_config_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_vision" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_trust_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_core_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_config_core_values_icon",
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"practice" varchar
  );
  
  CREATE TABLE "site_config_story_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_story_sectors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_why_work_with_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_config_why_work_with_us_icon",
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_employee_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"tenure" varchar,
  	"quote" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_contracting_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_config_contracting_services_icon",
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  ALTER TABLE "site_config" ADD COLUMN "stats_projects_delivered" numeric;
  ALTER TABLE "site_config" ADD COLUMN "stats_projects_delivered_label" varchar DEFAULT 'Projects Delivered';
  ALTER TABLE "site_config" ADD COLUMN "stats_years_of_excellence" numeric;
  ALTER TABLE "site_config" ADD COLUMN "stats_years_of_excellence_label" varchar DEFAULT 'Years of Excellence';
  ALTER TABLE "site_config" ADD COLUMN "stats_brand_partners" numeric;
  ALTER TABLE "site_config" ADD COLUMN "stats_brand_partners_label" varchar DEFAULT 'Global Brand Partners';
  ALTER TABLE "site_config" ADD COLUMN "stats_sectors_served" numeric;
  ALTER TABLE "site_config" ADD COLUMN "stats_sectors_served_label" varchar DEFAULT 'Sectors Served';
  ALTER TABLE "site_config" ADD COLUMN "operating_hours" varchar;
  ALTER TABLE "site_config_showrooms" ADD CONSTRAINT "site_config_showrooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_mission" ADD CONSTRAINT "site_config_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_vision" ADD CONSTRAINT "site_config_vision_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_trust_pillars" ADD CONSTRAINT "site_config_trust_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_core_values" ADD CONSTRAINT "site_config_core_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_story_meta" ADD CONSTRAINT "site_config_story_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_story_sectors" ADD CONSTRAINT "site_config_story_sectors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_why_work_with_us" ADD CONSTRAINT "site_config_why_work_with_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_employee_stories" ADD CONSTRAINT "site_config_employee_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_contracting_services" ADD CONSTRAINT "site_config_contracting_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_config_showrooms_order_idx" ON "site_config_showrooms" USING btree ("_order");
  CREATE INDEX "site_config_showrooms_parent_id_idx" ON "site_config_showrooms" USING btree ("_parent_id");
  CREATE INDEX "site_config_mission_order_idx" ON "site_config_mission" USING btree ("_order");
  CREATE INDEX "site_config_mission_parent_id_idx" ON "site_config_mission" USING btree ("_parent_id");
  CREATE INDEX "site_config_vision_order_idx" ON "site_config_vision" USING btree ("_order");
  CREATE INDEX "site_config_vision_parent_id_idx" ON "site_config_vision" USING btree ("_parent_id");
  CREATE INDEX "site_config_trust_pillars_order_idx" ON "site_config_trust_pillars" USING btree ("_order");
  CREATE INDEX "site_config_trust_pillars_parent_id_idx" ON "site_config_trust_pillars" USING btree ("_parent_id");
  CREATE INDEX "site_config_core_values_order_idx" ON "site_config_core_values" USING btree ("_order");
  CREATE INDEX "site_config_core_values_parent_id_idx" ON "site_config_core_values" USING btree ("_parent_id");
  CREATE INDEX "site_config_story_meta_order_idx" ON "site_config_story_meta" USING btree ("_order");
  CREATE INDEX "site_config_story_meta_parent_id_idx" ON "site_config_story_meta" USING btree ("_parent_id");
  CREATE INDEX "site_config_story_sectors_order_idx" ON "site_config_story_sectors" USING btree ("_order");
  CREATE INDEX "site_config_story_sectors_parent_id_idx" ON "site_config_story_sectors" USING btree ("_parent_id");
  CREATE INDEX "site_config_why_work_with_us_order_idx" ON "site_config_why_work_with_us" USING btree ("_order");
  CREATE INDEX "site_config_why_work_with_us_parent_id_idx" ON "site_config_why_work_with_us" USING btree ("_parent_id");
  CREATE INDEX "site_config_employee_stories_order_idx" ON "site_config_employee_stories" USING btree ("_order");
  CREATE INDEX "site_config_employee_stories_parent_id_idx" ON "site_config_employee_stories" USING btree ("_parent_id");
  CREATE INDEX "site_config_contracting_services_order_idx" ON "site_config_contracting_services" USING btree ("_order");
  CREATE INDEX "site_config_contracting_services_parent_id_idx" ON "site_config_contracting_services" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_config_showrooms" CASCADE;
  DROP TABLE "site_config_mission" CASCADE;
  DROP TABLE "site_config_vision" CASCADE;
  DROP TABLE "site_config_trust_pillars" CASCADE;
  DROP TABLE "site_config_core_values" CASCADE;
  DROP TABLE "site_config_story_meta" CASCADE;
  DROP TABLE "site_config_story_sectors" CASCADE;
  DROP TABLE "site_config_why_work_with_us" CASCADE;
  DROP TABLE "site_config_employee_stories" CASCADE;
  DROP TABLE "site_config_contracting_services" CASCADE;
  ALTER TABLE "site_config" DROP COLUMN "stats_projects_delivered";
  ALTER TABLE "site_config" DROP COLUMN "stats_projects_delivered_label";
  ALTER TABLE "site_config" DROP COLUMN "stats_years_of_excellence";
  ALTER TABLE "site_config" DROP COLUMN "stats_years_of_excellence_label";
  ALTER TABLE "site_config" DROP COLUMN "stats_brand_partners";
  ALTER TABLE "site_config" DROP COLUMN "stats_brand_partners_label";
  ALTER TABLE "site_config" DROP COLUMN "stats_sectors_served";
  ALTER TABLE "site_config" DROP COLUMN "stats_sectors_served_label";
  ALTER TABLE "site_config" DROP COLUMN "operating_hours";
  DROP TYPE "public"."enum_site_config_core_values_icon";
  DROP TYPE "public"."enum_site_config_why_work_with_us_icon";
  DROP TYPE "public"."enum_site_config_contracting_services_icon";`)
}
