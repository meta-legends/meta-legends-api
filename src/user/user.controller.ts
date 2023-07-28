import { Controller, Get, Post, Header, Param } from '@nestjs/common';
import { UserService } from '@src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Header('content-type', 'application/json')
  @Get(':wallet/is-holder')
  async isHolder(@Param('wallet') wallet: string) {
    return this.userService.isHolder(wallet.toLowerCase());
  }

  @Header('content-type', 'application/json')
  @Post(':wallet')
  async upsert(@Param('wallet') wallet: string) {
    return this.userService.upsert(wallet.toLowerCase());
  }
}
