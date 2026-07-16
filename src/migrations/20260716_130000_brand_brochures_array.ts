import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "brands_brochures" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"label" varchar,
   	"file_id" integer,
   	"url" varchar
   );

   ALTER TABLE "brands_brochures" ADD CONSTRAINT "brands_brochures_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   ALTER TABLE "brands_brochures" ADD CONSTRAINT "brands_brochures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "brands_brochures_order_idx" ON "brands_brochures" USING btree ("_order");
   CREATE INDEX "brands_brochures_parent_id_idx" ON "brands_brochures" USING btree ("_parent_id");
   CREATE INDEX "brands_brochures_file_idx" ON "brands_brochures" USING btree ("file_id");

   INSERT INTO "brands_brochures" ("_order", "_parent_id", "id", "file_id", "url")
   SELECT 1, "id", gen_random_uuid()::text, "brochure_id", "brochure_url"
   FROM "brands"
   WHERE "brochure_id" IS NOT NULL OR "brochure_url" IS NOT NULL;

   ALTER TABLE "brands" DROP CONSTRAINT "brands_brochure_id_media_id_fk";
   DROP INDEX "brands_brochure_idx";
   ALTER TABLE "brands" DROP COLUMN "brochure_id";
   ALTER TABLE "brands" DROP COLUMN "brochure_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brands" ADD COLUMN "brochure_id" integer;
   ALTER TABLE "brands" ADD COLUMN "brochure_url" varchar;

   UPDATE "brands" b
   SET "brochure_id" = bb."file_id",
       "brochure_url" = bb."url"
   FROM (
     SELECT DISTINCT ON ("_parent_id") "_parent_id", "file_id", "url"
     FROM "brands_brochures"
     ORDER BY "_parent_id", "_order" ASC
   ) bb
   WHERE b."id" = bb."_parent_id";

   ALTER TABLE "brands" ADD CONSTRAINT "brands_brochure_id_media_id_fk" FOREIGN KEY ("brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "brands_brochure_idx" ON "brands" USING btree ("brochure_id");

   DROP TABLE "brands_brochures" CASCADE;`)
}
