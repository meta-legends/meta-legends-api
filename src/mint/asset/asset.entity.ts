import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MintOrder } from '@src/mint/order/mint-order.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 123 })
  name: string;

  @Column('varchar', { length: 123 })
  code: string;

  @Column('varchar', { length: 63 })
  contract: string;

  @Column('int')
  supply: number;

  @Column({ default: false })
  isOpen: boolean;

  @Column('datetime')
  openOn: string;

  @OneToMany(() => MintOrder, (mintOrder) => mintOrder.asset)
  mintOrders: MintOrder[];
}
