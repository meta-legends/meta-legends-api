import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PreferenceOgPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  position: number;
}
