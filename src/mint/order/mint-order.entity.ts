import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@src/user/user.entity';
import { Asset } from '@src/mint/asset/asset.entity';

@Entity()
export class MintOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset, (asset) => asset.mintOrders)
  asset: Asset;

  @ManyToOne(() => User, (user) => user.mintOrders)
  user: User;

  @Column('int')
  position: number;

  @Column('varchar', { length: 123 })
  choice: string;

  @Column({ default: false })
  minted: boolean;

  @Column('datetime')
  updatedAt: string;
}
