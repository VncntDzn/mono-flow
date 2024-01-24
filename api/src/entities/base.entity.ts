import { DateTime } from 'luxon';
import {
  BaseEntity as BaseTypeormEntity,
  BeforeInsert,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseTypeormEntity {
  @Column({ type: 'timestamptz', nullable: true })
  time_created_at: DateTime | null;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    name: 'time_updated_at',
  })
  time_updated_at: DateTime | null;

  @BeforeInsert()
  protected setCreatedAt() {
    this.time_created_at = DateTime.utc();
  }
}
