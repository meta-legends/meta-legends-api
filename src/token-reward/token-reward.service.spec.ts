import {Test, TestingModule} from '@nestjs/testing';
import {TokenRewardService} from './token-reward.service';

describe('TokenRewardService', () => {
    let service: TokenRewardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TokenRewardService],
        }).compile();

        service = module.get<TokenRewardService>(TokenRewardService);
    });

    it('should be estimated days between 2 dates', () => {
        const startDate = new Date('2022-01-01 20:00:00');
        const endDate = new Date('2022-01-07 15:00:00');
        expect(service.getDaysBetweenDates(startDate, endDate)).toEqual(6);
    });

    it('should get ratio empty for none package', () => {
        expect(service.getRewardRatios(0.3)).toEqual([]);
    });

    it('should get ratio bronze for package', () => {
        expect(service.getRewardRatios(0.5)).toEqual([0.21]);
        expect(service.getRewardRatios(0.6)).toEqual([0.21]);
    });

    it('should get ratio silver for package', () => {
        expect(service.getRewardRatios(1)).toEqual([0.21, 0.82]);
        expect(service.getRewardRatios(1.3)).toEqual([0.21, 0.82]);
    });
    it('should get ratio gold for package', () => {
        expect(service.getRewardRatios(1.5)).toEqual([0.21, 0.82, 1.64]);
        expect(service.getRewardRatios(1.9)).toEqual([0.21, 0.82, 1.64]);
    });
    it('should get ratio emerald for package', () => {
        expect(service.getRewardRatios(2.1)).toEqual([0.21, 0.82, 1.64, 3.08]);
    });
    it('should get ratio diamond for package', () => {
        expect(service.getRewardRatios(2.5)).toEqual([0.21, 0.82, 1.64, 3.08, 7.44]);
        expect(service.getRewardRatios(2.9)).toEqual([0.21, 0.82, 1.64, 3.08, 7.44]);
        expect(service.getRewardRatios(3)).toEqual([0.21, 0.82, 1.64, 3.08, 7.44]);
    });
});
