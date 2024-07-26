import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  category: string;

  @Column('varchar', { length: 63 })
  name: string;

  @Column('varchar', { length: 255 })
  description: string;
}
