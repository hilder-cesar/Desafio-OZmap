import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sync_meta')
export class SyncMeta {
  @PrimaryColumn({ length: 32 })
  key!: string;

  @Column({ name: 'last_cursor', type: 'timestamp' })
  lastCursor!: Date;
}
