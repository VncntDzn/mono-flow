import { genSalt, hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  // necessary to detect migration's table column name
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'password' })
  password: string;

  @BeforeInsert()
  private async generateHashPassword() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
}
