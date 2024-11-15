import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OgLand } from '@src/eligibility/og-land/og-land.entity';
import { User } from '@src/user/user.entity';

@Entity()
export class LandWish {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('int', { nullable: false })
  tokenId: number;

  @Column('varchar', { nullable: false, length: 63 })
  category: string;

  @Column('boolean', { default: false })
  hasGuardian: boolean;

  @ManyToOne(() => OgLand, (land) => land.landWishes)
  land: OgLand;

  @ManyToOne(() => User, (user) => user.landWishes)
  user: User;

  @Column('datetime')
  createdAt: string;
}
