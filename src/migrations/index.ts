import * as migration_20260626_074238_initial from './20260626_074238_initial';
import * as migration_20260626_115952_milestones_rich_fields from './20260626_115952_milestones_rich_fields';
import * as migration_20260626_122531_siteconfig_richer from './20260626_122531_siteconfig_richer';
import * as migration_20260626_124544_new_collections from './20260626_124544_new_collections';
import * as migration_20260627_120000_map_locations from './20260627_120000_map_locations';
import * as migration_20260627_180000_map_locations_latlng from './20260627_180000_map_locations_latlng';
import * as migration_20260627_190000_map_label_offsets from './20260627_190000_map_label_offsets';
import * as migration_20260628_080000_brand_brochure from './20260628_080000_brand_brochure';
import * as migration_20260628_100000_brand_brochure_url from './20260628_100000_brand_brochure_url';

export const migrations = [
  {
    up: migration_20260626_074238_initial.up,
    down: migration_20260626_074238_initial.down,
    name: '20260626_074238_initial',
  },
  {
    up: migration_20260626_115952_milestones_rich_fields.up,
    down: migration_20260626_115952_milestones_rich_fields.down,
    name: '20260626_115952_milestones_rich_fields',
  },
  {
    up: migration_20260626_122531_siteconfig_richer.up,
    down: migration_20260626_122531_siteconfig_richer.down,
    name: '20260626_122531_siteconfig_richer',
  },
  {
    up: migration_20260626_124544_new_collections.up,
    down: migration_20260626_124544_new_collections.down,
    name: '20260626_124544_new_collections'
  },
  {
    up: migration_20260627_120000_map_locations.up,
    down: migration_20260627_120000_map_locations.down,
    name: '20260627_120000_map_locations',
  },
  {
    up: migration_20260627_180000_map_locations_latlng.up,
    down: migration_20260627_180000_map_locations_latlng.down,
    name: '20260627_180000_map_locations_latlng',
  },
  {
    up: migration_20260627_190000_map_label_offsets.up,
    down: migration_20260627_190000_map_label_offsets.down,
    name: '20260627_190000_map_label_offsets',
  },
  {
    up: migration_20260628_080000_brand_brochure.up,
    down: migration_20260628_080000_brand_brochure.down,
    name: '20260628_080000_brand_brochure',
  },
  {
    up: migration_20260628_100000_brand_brochure_url.up,
    down: migration_20260628_100000_brand_brochure_url.down,
    name: '20260628_100000_brand_brochure_url',
  },
];
