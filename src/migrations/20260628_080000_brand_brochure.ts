import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brands" ADD COLUMN "brochure_id" integer;
   ALTER TABLE "brands" ADD CONSTRAINT "brands_brochure_id_media_id_fk" FOREIGN KEY ("brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "brands_brochure_idx" ON "brands" USING btree ("brochure_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "brands" DROP CONSTRAINT "brands_brochure_id_media_id_fk";
   DROP INDEX "brands_brochure_idx";
   ALTER TABLE "brands" DROP COLUMN "brochure_id";`)
}
