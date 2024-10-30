import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
