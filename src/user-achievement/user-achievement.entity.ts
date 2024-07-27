import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@src/user/user.entity';
import { Achievement } from '@src/achievement/achievement.entity';

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Achievement, (achievement) => achievement.userAchievements)
  achievement: Achievement;

  @ManyToOne(() => User, (user) => user.userAchievements)
  user: User;

  @Column('datetime')
  createdAt: string;
}
