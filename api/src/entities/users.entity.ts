import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @BeforeInsert()
  private async generateHashPassword() {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
}
