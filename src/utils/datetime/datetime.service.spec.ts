import { Test, TestingModule } from '@nestjs/testing';
import { DatetimeService } from './datetime.service';

describe('DatetimeService', () => {
  let service: DatetimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatetimeService],
    }).compile();

    service = module.get<DatetimeService>(DatetimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be estimated days between 2 dates', () => {
    const startDate = new Date('2022-01-01 20:00:00');
    const endDate = new Date('2022-01-07 15:00:00');
    expect(service.getDaysBetweenDates(startDate, endDate)).toEqual(6);

    const startDate2 = new Date('2021-11-25');
    const endDate2 = new Date('2023-04-07');
    expect(service.getDaysBetweenDates(startDate2, endDate2)).toEqual(498);
    const startDate3 = new Date('2021-12-25');
    const endDate3 = new Date('2022-01-01');
    expect(service.getDaysBetweenDates(startDate3, endDate3)).toEqual(7);
    const startDate4 = new Date('2021-12-25');
    const endDate4 = new Date('2022-02-02');
    expect(service.getDaysBetweenDates(startDate4, endDate4)).toEqual(39);
  });
});
