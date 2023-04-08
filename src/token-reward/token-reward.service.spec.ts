import {Test, TestingModule} from '@nestjs/testing';
import {TokenRewardService} from './token-reward.service';
import {MintPackage} from "../mint-package/mint-package.entity";

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

    it('should estimate none package', () => {
        const mintPackage: MintPackage = {
            id: 1,
            mintWallet:'',
            priceOfSaleEth:0.3,
            pricePaidEth:0.3,
            mintAt:'2021-12-25',
            tokens:'',
            nbTokens:1,
            primaryWallet:''
        }
        expect(service.estimate(mintPackage, new Date('2022-01-01'))).toEqual(0);
    })
    it('should estimate bronze package', () => {
        let mintPackage: MintPackage = {
            id: 1,
            mintWallet:'',
            priceOfSaleEth:0.5,
            pricePaidEth:0.5,
            mintAt:'2021-12-25',
            tokens:'',
            nbTokens:1,
            primaryWallet:''
        }
        expect(service.estimate(mintPackage, new Date('2022-01-01'))).toEqual(1.47);
        mintPackage.pricePaidEth = 0.9;
        expect(service.estimate(mintPackage, new Date('2022-02-02'))).toEqual(8.19);
    })
    it('should estimate diamond package', () => {
        let mintPackage: MintPackage = {
            id: 1,
            mintWallet:'',
            priceOfSaleEth:3,
            pricePaidEth:6,
            mintAt:'2021-11-25',
            tokens:'',
            nbTokens:2,
            primaryWallet:''
        }
        expect(service.estimate(mintPackage, new Date('2023-04-07'))).toEqual(13137.24);
    })
});
