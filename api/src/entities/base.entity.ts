import {
  BaseEntity as BaseTypeormEntity,
  BeforeInsert,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

export class BaseEntity extends BaseTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timeCreatedAt: DateTime;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  timeUpdatedAt: DateTime | null;

  @BeforeInsert()
  protected setCreatedAt() {
    this.timeCreatedAt = DateTime.utc();
  }
}
