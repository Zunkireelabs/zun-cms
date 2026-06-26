import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_milestones_icon" AS ENUM('Sparkles', 'Bath', 'Wrench', 'Recycle', 'Armchair', 'Award', 'Trophy', 'Building2', 'Briefcase');
  CREATE TABLE "milestones_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  ALTER TABLE "milestones" ADD COLUMN "title" varchar;
  ALTER TABLE "milestones" ADD COLUMN "icon" "enum_milestones_icon";
  ALTER TABLE "milestones_brands" ADD CONSTRAINT "milestones_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."milestones"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "milestones_brands_order_idx" ON "milestones_brands" USING btree ("_order");
  CREATE INDEX "milestones_brands_parent_id_idx" ON "milestones_brands" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "milestones_brands" CASCADE;
  ALTER TABLE "milestones" DROP COLUMN "title";
  ALTER TABLE "milestones" DROP COLUMN "icon";
  DROP TYPE "public"."enum_milestones_icon";`)
}
