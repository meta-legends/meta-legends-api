import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Land } from '@src/land/land.entity';
import { User } from '@src/user/user.entity';
import { LandContent } from '@src/land/land-content/land-content.entity';

@Entity()
export class LandMinted {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('int', { nullable: false })
  tokenId: number;

  @Column('varchar', { nullable: false, length: 63 })
  category: string;

  @Column('boolean', { default: false })
  guardian: boolean;

  @ManyToOne(() => Land, (land) => land.landsMinted)
  land: Land;

  @ManyToOne(() => User, (user) => user.landsMinted)
  user: User;

  @Column('datetime')
  createdAt: string;

  @OneToOne(() => LandContent, (landContent) => landContent.landMinted)
  landContent!: LandContent | null;
}
