import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '@src/user/user.entity';

@Entity()
export class OgLand {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('varchar', { nullable: false, length: 63 })
  class: string;

  @Column('varchar', { nullable: false, length: 63 })
  city: string;

  @Column('varchar', { nullable: false, unique: true, length: 63 })
  slug: string;

  @Column('varchar', { nullable: true, length: 63 })
  address: string;

  @OneToOne(() => User, (user) => user.ogLand, { nullable: true })
  @JoinColumn()
  user!: User | null;
}
