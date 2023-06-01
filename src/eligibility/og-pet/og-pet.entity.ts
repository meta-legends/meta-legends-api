import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '@src/user/user.entity';

@Entity()
export class OgPet {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('varchar', { length: 63 })
  address: string;

  @Column('int')
  council: number;

  @Column('int')
  guardian: number;

  @Column('int')
  honorary: number;

  @Column('int')
  judge: number;

  @Column('int')
  mint: number;

  @Column('int')
  og: number;

  @Column('int')
  whale: number;

  @OneToOne(() => User, (user) => user.ogPet)
  @JoinColumn()
  user!: User | null;
}
