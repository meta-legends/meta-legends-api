import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mint } from '@src/mint/mint.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 123 })
  name: string;

  @Column('varchar', { length: 123, unique: true })
  code: string;

  @Column('varchar', { length: 63, nullable: true })
  contract!: string | null;

  @Column({ type: 'int', nullable: true })
  supply!: number | null;

  @Column({ default: false })
  isOpen: boolean;

  @Column({ type: 'datetime', nullable: true })
  openOn!: string | null;

  @OneToMany(() => Mint, (mint) => mint.asset)
  mints: Mint[];
}
