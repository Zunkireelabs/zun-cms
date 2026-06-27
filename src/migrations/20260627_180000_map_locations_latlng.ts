import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Wipe existing rows since the data shape changes (markerX/Y → lat/lng).
   -- The seed will repopulate from MAP_LOCATION_SOURCES after migration runs.
   DELETE FROM "map_locations_keywords";
   DELETE FROM "map_locations";

   ALTER TABLE "map_locations" ADD COLUMN "latitude" numeric;
   ALTER TABLE "map_locations" ADD COLUMN "longitude" numeric;

   ALTER TABLE "map_locations" DROP COLUMN "marker_x";
   ALTER TABLE "map_locations" DROP COLUMN "marker_y";
   ALTER TABLE "map_locations" DROP COLUMN "label_x";
   ALTER TABLE "map_locations" DROP COLUMN "label_y";

   ALTER TABLE "map_locations" ALTER COLUMN "latitude" SET NOT NULL;
   ALTER TABLE "map_locations" ALTER COLUMN "longitude" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DELETE FROM "map_locations_keywords";
   DELETE FROM "map_locations";

   ALTER TABLE "map_locations" ADD COLUMN "marker_x" numeric;
   ALTER TABLE "map_locations" ADD COLUMN "marker_y" numeric;
   ALTER TABLE "map_locations" ADD COLUMN "label_x" numeric;
   ALTER TABLE "map_locations" ADD COLUMN "label_y" numeric;

   ALTER TABLE "map_locations" DROP COLUMN "latitude";
   ALTER TABLE "map_locations" DROP COLUMN "longitude";

   ALTER TABLE "map_locations" ALTER COLUMN "marker_x" SET NOT NULL;
   ALTER TABLE "map_locations" ALTER COLUMN "marker_y" SET NOT NULL;
   ALTER TABLE "map_locations" ALTER COLUMN "label_x" SET NOT NULL;
   ALTER TABLE "map_locations" ALTER COLUMN "label_y" SET NOT NULL;`)
}
