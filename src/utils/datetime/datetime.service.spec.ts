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
  });
});
