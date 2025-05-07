import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

export enum EntityType {
  CABLE = 'CABLE',
  BOX = 'BOX',
  DROP = 'DROP',
  CUSTOMER = 'CUSTOMER'
}

@Entity('entity_map')
export class EntityMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'isp_id', type: 'varchar', length: 100 })
  ispId: string;

  @Column({ name: 'ozmap_id', type: 'varchar', length: 100 })
  ozmapId: string;

  @Column({ type: 'enum', enum: EntityType })
  type: EntityType;

  @Column({ name: 'last_hash', type: 'char', length: 64 })
  lastHash: string;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
