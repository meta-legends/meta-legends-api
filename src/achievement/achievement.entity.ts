import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAchievement } from '@src/user-achievement/user-achievement.entity';

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

  @OneToMany(
    () => UserAchievement,
    (userAchievement) => userAchievement.achievement,
  )
  userAchievements: UserAchievement[];
}
