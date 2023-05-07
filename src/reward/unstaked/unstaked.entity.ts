import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Unstaked {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  address: string;

  @Column('int')
  weapon: number;

  @Column('int')
  armor: number;

  @Column('int')
  pet: number;

  @Column('int')
  vehicle: number;

  @Column('int')
  residence: number;

  @Column('int')
  land: number;
}
