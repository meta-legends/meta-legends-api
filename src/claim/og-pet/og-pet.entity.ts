import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('claim_og_pet')
export class OgPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  address: string;

  @Column('int')
  council: number;

  @Column('int')
  guardian: number;

  @Column('int')
  honorary: number;

  @Column('int')
  judge: number;

  @Column('int')
  mint: number;

  @Column('int')
  og: number;

  @Column('int')
  whale: number;
}
