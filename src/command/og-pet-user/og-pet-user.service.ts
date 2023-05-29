import { Injectable, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { OgPetService } from '@src/eligibility/og-pet/og-pet.service';
import { UserService } from '@src/user/user.service';
import { OgPet } from '@src/eligibility/og-pet/og-pet.entity';
import { DataSource } from 'typeorm/data-source/DataSource';

@Command({
  name: 'og-pet-user-defined',
  description: 'Define user',
})
@Injectable()
export class OgPetUserService extends CommandRunner {
  private static readonly logger = new Logger(OgPetUserService.name);
  constructor(
    private dataSource: DataSource,
    private ogPetService: OgPetService,
    private userService: UserService,
  ) {
    super();
  }
  async run() {
    OgPetUserService.logger.log('[Command] OgPetUserService');
    const ogPets = await this.ogPetService.findAll();
    for await (const ogPet of ogPets) {
      ogPet.user = await this.userService.findOne(ogPet.address);
      await this.dataSource
        .createQueryBuilder()
        .update(OgPet)
        .set(ogPet)
        .where('id = :id', { id: ogPet.id })
        .execute();
    }
  }
}
