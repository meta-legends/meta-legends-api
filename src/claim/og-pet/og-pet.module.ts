import { Module } from '@nestjs/common';
import { OgPetController } from './og-pet.controller';
import { OgPetService } from './og-pet.service';

@Module({
  controllers: [OgPetController],
  providers: [OgPetService]
})
export class OgPetModule {}
