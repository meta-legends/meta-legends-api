import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

// import fs = require('fs');
// import path = require('path');
// import { UserService } from '@src/user/user.service';
//
import { AchievementService as AchievService } from '@src/achievement/achievement.service';
// import { UserAchievementService } from '@src/user-achievement/user-achievement.service';

// npm run command-nest achievement-define
@Command({
  name: 'achievement-define',
  description: 'Define achievement by snapshot',
})
@Injectable()
export class AchievementService extends CommandRunner {
  private static readonly logger = new Logger(AchievementService.name);

  constructor(private achievementService: AchievService) {
    super();
  }

  async run() {
    const allAchievements = await this.achievementService.getAllByCategory();
    console.log(allAchievements);
    // const achievements = this.achievService.orderByCode(allAchievements);
    // const rows = fs.readFileSync(
    //   path.resolve(__dirname + '/20240727131213_badge-rewards.csv'),
    //   'utf-8',
    // );
    //
    // const wallets = [];
    // const holders = {};
    // rows.split('\n').forEach((line) => {
    //   const data = line.split(',');
    //   wallets.push(data[0]);
    //   holders[data[0]] = data[1];
    // });
    //
    // for (const wallet of wallets) {
    //   const user = await this.userService.upsert(wallet);
    //   const userAchievements =
    //     this.userAchievementService.defineHoldingRewardAchievements(
    //       user,
    //       achievements,
    //       holders[wallet],
    //     );
    //   console.log(userAchievements);
    // }
    // const user = await this.userService.findOne('0x24DF9F5A2624Db695ee695399fd43DEB62c475Bd');
    //
    // const userAchievements =
    //   this.userAchievementService.defineHoldingRewardAchievements(
    //     user,
    //     achievements,
    //     1,
    //   );
    //
    // console.log(userAchievements);
  }
}
