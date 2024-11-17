import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LandMinted } from '@src/land/land-minted/land-minted.entity';

@Entity()
export class Land {
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

  @OneToMany(() => LandMinted, (landMinted) => landMinted.land)
  landsMinted: LandMinted[];
}
