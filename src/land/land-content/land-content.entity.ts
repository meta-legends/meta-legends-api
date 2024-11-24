import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LandMinted } from '@src/land/land-minted/land-minted.entity';

@Entity()
export class LandContent {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('varchar', { nullable: true })
  biomeName: string;

  @Column('varchar', { nullable: true })
  cardName: string;

  @Column('varchar', { nullable: true, length: 63 })
  category: string;

  @Column('varchar', { nullable: true, length: 63 })
  class: string;

  @OneToOne(() => LandMinted, (landMinted) => landMinted.landContent)
  @JoinColumn()
  landMinted!: LandMinted | null;
}
