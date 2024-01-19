import { genSalt, hash } from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, name: 'email' })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column()
  password: string;

  @BeforeInsert()
  private async generateHashPassword() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
}
