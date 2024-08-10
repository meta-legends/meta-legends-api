import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserAchievement } from '@src/user-achievement/user-achievement.entity';
import { User } from '@src/user/user.entity';
import { Achievement } from '@src/achievement/achievement.entity';
import * as moment from "moment";

@Injectable()
export class UserAchievementService {
  constructor(
    @InjectRepository(UserAchievement)
    private userAchievementRepository: Repository<UserAchievement>,
  ) {}

  async getAchievements(user: User) {
    const userAchievements = await this.userAchievementRepository.find({
      relations: { achievement: true },
      where: {
        user: user,
      },
    });
    return userAchievements.map((userAchievement) => {
      return userAchievement.achievement;
    });
  }

  defineHoldingRewardAchievements(
    user: User,
    achievementsSortByCode,
    nbNftHold,
  ) {
    // 📷 (1 to 2) holder
    // 📷 (3 to 5) Legend investor : Rough Armor
    // 📷(6 to 10) Virtual conservative : Goldboi Weapon
    // 📷(11 to 20) Legendary Holder : Cyber Pet
    // 📷(21 to 50) Legend Museum : Goldboi Vehicle (The on in preview )
    const userAchievements = [];

    let rest = nbNftHold;
    if (rest >= 51) {
      const nbWhaleBadge = Math.floor(rest / 51);
      for (let i = 0; i < nbWhaleBadge; i++) {
        const achievement = this.createUserAchievement(
          user,
          achievementsSortByCode['legend-whale'],
        );
        userAchievements.push(achievement);
        rest -= 51;
      }
    }

    if (rest == 0) {
      return userAchievements;
    }

    if (rest <= 2) {
      const achievement = this.createUserAchievement(
        user,
        achievementsSortByCode['holder'],
      );
      userAchievements.push(achievement);
      return userAchievements;
    }

    if (rest <= 5) {
      const achievement = this.createUserAchievement(
        user,
        achievementsSortByCode['legend-investor'],
      );
      userAchievements.push(achievement);
      return userAchievements;
    }
    if (rest <= 10) {
      const achievement = this.createUserAchievement(
        user,
        achievementsSortByCode['virtual-conservative'],
      );
      userAchievements.push(achievement);
      return userAchievements;
    }
    if (rest <= 20) {
      const achievement = this.createUserAchievement(
        user,
        achievementsSortByCode['legendary-holder'],
      );
      userAchievements.push(achievement);
      return userAchievements;
    }
    if (rest <= 50) {
      const achievement = this.createUserAchievement(
        user,
        achievementsSortByCode['legend-museum'],
      );
      userAchievements.push(achievement);
      return userAchievements;
    }

    return userAchievements;
  }

  createUserAchievement(user: User, achievement: Achievement): UserAchievement {
    const userAchievement = new UserAchievement();
    userAchievement.user = user;
    userAchievement.achievement = achievement;
    userAchievement.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    return userAchievement;
  }
}
