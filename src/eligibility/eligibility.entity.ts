import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Asset } from '../asset/asset.entity';

@Entity()
export class Eligibility {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('varchar', { length: 63 })
  address: string;

  @Column('varchar')
  type: string;

  @Column('int')
  quantity: number;

  @ManyToOne(() => User, (user) => user.eligibility)
  @JoinColumn()
  user!: User | null;

  @ManyToOne(() => Asset, (asset) => asset.eligibility)
  @JoinColumn()
  asset: Asset;
}
