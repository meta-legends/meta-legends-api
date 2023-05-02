import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MintPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 63 })
  mintWallet: string;

  @Column('decimal', { precision: 5, scale: 2 })
  priceOfSaleEth: number;

  @Column('decimal', { precision: 5, scale: 2 })
  pricePaidEth: number;

  @Column('datetime')
  mintAt: string;

  @Column()
  tokens: string;

  @Column('int')
  nbTokens: number;
}
