import { Module } from '@nestjs/common';
import { DatetimeService } from './datetime/datetime.service';

@Module({
  providers: [DatetimeService],
})
export class UtilsModule {}
