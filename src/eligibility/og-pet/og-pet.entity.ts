import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '@src/user/user.entity';

@Entity()
export class OgPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  address: string;

  @OneToOne(() => User, (user) => user.ogPet)
  @JoinColumn()
  user: User;

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
