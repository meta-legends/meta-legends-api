import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class HoldingReward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  rewardCode: string;

  @Column('int')
  tokenId: number;

  @ManyToOne(() => User, (user) => user.holdingRewards)
  user: User;

  @Column('datetime')
  createdAt: string;
}
