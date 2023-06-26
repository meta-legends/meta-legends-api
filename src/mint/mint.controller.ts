import {
  Body,
  Controller,
  Header,
  Param,
  ParseArrayPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from 'express';
import { UserService } from '@src/user/user.service';
import { AssetService } from '@src/asset/asset.service';
import { MintInsertDto } from '@src/mint/mint-insert.dto';
import { User } from '@src/user/user.entity';
import { MintService } from '@src/mint/mint.service';

@Controller('mints')
export class MintController {
  constructor(
    private userService: UserService,
    private assetService: AssetService,
    private mintService: MintService,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Post(':assetCode')
  async post(@Req() request: Request, @Param('assetCode') assetCode: string) {
    return true;
  }
}
