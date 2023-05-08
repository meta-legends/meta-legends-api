import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Legend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  address: string;

  @Column('boolean')
  progress: boolean;

  @Column('datetime')
  purchasedOn: string;

  @Column('int')
  tokenId: number;
}
