import * as migration_20260626_074238_initial from './20260626_074238_initial';
import * as migration_20260626_115952_milestones_rich_fields from './20260626_115952_milestones_rich_fields';
import * as migration_20260626_122531_siteconfig_richer from './20260626_122531_siteconfig_richer';
import * as migration_20260626_124544_new_collections from './20260626_124544_new_collections';

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
];
