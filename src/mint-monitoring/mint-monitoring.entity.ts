import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MintOrder } from '@src/mint-order/mint-order.entity';
import { Asset } from '@src/asset/asset.entity';
import { Mint } from '@src/mint/mint.entity';

@Entity()
export class MintMonitoring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 123 })
  name: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  minted: number;

  @Column({ type: 'int', nullable: true })
  supply: number;

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  rarity!: number | null;

  @OneToMany(() => MintOrder, (mintOrder) => mintOrder.mintMonitoring)
  mintOrders: MintOrder[];

  @OneToMany(() => Mint, (mint) => mint.mintMonitoring)
  mints: Mint[];

  @ManyToOne(() => Asset, (asset) => asset.mintOrders)
  asset: Asset;
}
