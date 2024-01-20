import { DateTime } from 'luxon';
import {
  BaseEntity as BaseTypeormEntity,
  BeforeInsert,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseTypeormEntity {
  @Column({ type: 'timestamptz' })
  timeCreatedAt: DateTime;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  timeUpdatedAt: DateTime | null;

  @BeforeInsert()
  protected setCreatedAt() {
    this.timeCreatedAt = DateTime.utc();
  }
}
