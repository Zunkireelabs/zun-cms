import * as migration_20260626_074238_initial from './20260626_074238_initial';

export const migrations = [
  {
    up: migration_20260626_074238_initial.up,
    down: migration_20260626_074238_initial.down,
    name: '20260626_074238_initial'
  },
];
