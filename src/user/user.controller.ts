import { Controller, Get, Header, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get('/is-holder')
  async isHolder(@Req() request: Request) {
    return this.userService.isHolder(request['user-wallet']);
  }
}
