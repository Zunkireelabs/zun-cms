import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_locations" ADD COLUMN "label_offset_x" numeric DEFAULT 0;
   ALTER TABLE "map_locations" ADD COLUMN "label_offset_y" numeric DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "map_locations" DROP COLUMN "label_offset_x";
   ALTER TABLE "map_locations" DROP COLUMN "label_offset_y";`)
}
