import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LandWish } from '@src/eligibility/land-wish/land-wish.entity';

@Entity()
export class OgLand {
  @PrimaryGeneratedColumn()
  id!: number | null;

  @Column('varchar', { nullable: false, length: 63 })
  class: string;

  @Column('varchar', { nullable: false, length: 63 })
  area: string;

  @Column('varchar', { nullable: false, unique: true, length: 63 })
  slug: string;

  @Column('int', { nullable: false })
  supply: number;

  @OneToMany(() => LandWish, (landWish) => landWish.land)
  landWishes: LandWish[];
}
