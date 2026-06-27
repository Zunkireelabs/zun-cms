import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_map_locations_direction" AS ENUM('up', 'down');
  CREATE TABLE "map_locations_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );

  CREATE TABLE "map_locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"marker_x" numeric NOT NULL,
  	"marker_y" numeric NOT NULL,
  	"label_x" numeric NOT NULL,
  	"label_y" numeric NOT NULL,
  	"direction" "enum_map_locations_direction" DEFAULT 'up' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "map_locations_id" integer;
  ALTER TABLE "map_locations_keywords" ADD CONSTRAINT "map_locations_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "map_locations_keywords_order_idx" ON "map_locations_keywords" USING btree ("_order");
  CREATE INDEX "map_locations_keywords_parent_id_idx" ON "map_locations_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "map_locations_name_idx" ON "map_locations" USING btree ("name");
  CREATE INDEX "map_locations_updated_at_idx" ON "map_locations" USING btree ("updated_at");
  CREATE INDEX "map_locations_created_at_idx" ON "map_locations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_locations_fk" FOREIGN KEY ("map_locations_id") REFERENCES "public"."map_locations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_map_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("map_locations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_locations_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "map_locations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "map_locations_keywords" CASCADE;
  DROP TABLE "map_locations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_map_locations_fk";

  DROP INDEX "payload_locked_documents_rels_map_locations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "map_locations_id";
  DROP TYPE "public"."enum_map_locations_direction";`)
}
