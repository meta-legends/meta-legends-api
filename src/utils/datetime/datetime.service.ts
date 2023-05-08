import { Injectable } from '@nestjs/common';

@Injectable()
export class DatetimeService {
  getDaysBetweenDates(startDate: Date, endDate: Date): number {
    // Hours * minutes * seconds * milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs((endDate.getTime() - startDate.getTime()) / oneDay),
    );
  }
}
