import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MintOrder } from '@src/mint-order/mint-order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  wallet: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('boolean', { default: false })
  isModo: boolean;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column('datetime', { nullable: true})
  lastLogin!: string | null;

  @Column('datetime')
  createdAt: string;

  @OneToMany(() => MintOrder, (mintOrder) => mintOrder.user)
  mintOrders: MintOrder[];
}
