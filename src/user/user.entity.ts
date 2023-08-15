import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { OgPet } from '../eligibility/og-pet/og-pet.entity';
import { HoldingReward } from '../holding-reward/holding-reward.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63, unique: true })
  wallet: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('boolean', { default: false })
  isModo: boolean;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column('datetime', { nullable: true })
  lastLogin!: string | null;

  @Column('datetime')
  createdAt: string;

  @OneToOne(() => OgPet, (ogPet) => ogPet.user)
  ogPet!: OgPet | null;

  @OneToMany(() => HoldingReward, (holdingReward) => holdingReward.user)
  holdingRewards: HoldingReward[];
}
