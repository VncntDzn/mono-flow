import { DateTime } from 'luxon';
import {
  BaseEntity as BaseTypeormEntity,
  BeforeInsert,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseTypeormEntity {
  @Column({ type: 'timestamptz', name: 'time_created_at', nullable: true })
  timeCreatedAt: DateTime;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    name: 'time_updated_at',
  })
  timeUpdatedAt: DateTime | null;

  @BeforeInsert()
  protected setCreatedAt() {
    this.timeCreatedAt = DateTime.utc();
  }
}
