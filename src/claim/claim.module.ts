import { Module } from '@nestjs/common';
import { OgPetModule } from './og-pet/og-pet.module';

@Module({
  imports: [OgPetModule]
})
export class ClaimModule {}
