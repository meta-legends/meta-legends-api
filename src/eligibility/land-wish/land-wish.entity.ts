import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OgLand } from '@src/eligibility/og-land/og-land.entity';
import { User } from '@src/user/user.entity';

@Entity()
export class LandWish {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @ManyToOne(() => OgLand, (land) => land.landWishes)
  land: OgLand;

  @ManyToOne(() => User, (user) => user.landWishes)
  user: User;

  @Column('datetime')
  createdAt: string;
}
