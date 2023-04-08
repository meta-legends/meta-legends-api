import { Injectable } from '@nestjs/common';
import {MintPackage} from "../mint-package/mint-package.entity";

@Injectable()
export class TokenRewardService {
    estimate(mintPackage: MintPackage, now: Date): number  {
        const pricePackage = mintPackage.pricePaidEth/mintPackage.nbTokens;
        const rewardRatios = this.getRewardRatios(pricePackage);

        if (rewardRatios.length === 0) {
            return 0;
        }

        const mintDate = new Date(mintPackage.mintAt);
        if (isNaN(mintDate.getTime())) {
            throw new Error("Invalid date string: " + mintPackage.mintAt);
        }

        const diffDays = this.getDaysBetweenDates(mintDate, now);
        if (isNaN(diffDays)) {
            throw new Error("Invalid date range: " + mintPackage.mintAt + " - " + now);
        }

        let rewards = 0;
        rewardRatios.forEach((ratio) => {
            rewards += diffDays * ratio * mintPackage.nbTokens
        })

        const roundedRewards = rewards.toFixed(2);

        return Number(roundedRewards);
    }

    getDaysBetweenDates(startDate: Date, endDate: Date): number {
        // Hours * minutes * seconds * milliseconds
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs(((endDate.getTime() - startDate.getTime()) / oneDay)));
    }

    getRewardRatios(pricePackage): number[] {
        let rewardRatios = [0.21, 0.82, 1.64, 3.08, 7.44];
        if (pricePackage < 0.5) {
            return [];
        }

        if (pricePackage >= 2.5) {
            return rewardRatios;
        }

        rewardRatios.pop();
        if (pricePackage < 2.5 && pricePackage >= 2) {
            return rewardRatios;
        }
        rewardRatios.pop();
        if (pricePackage < 2 && pricePackage >= 1.5) {
            return rewardRatios;
        }
        rewardRatios.pop();
        if (pricePackage < 1.5 && pricePackage >= 1) {
            return rewardRatios;
        }
        rewardRatios.pop();
        if (pricePackage < 1 && pricePackage >= 0.5) {
            return rewardRatios;
        }
    }
}
