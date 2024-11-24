import {
  Body,
  ClassSerializerInterceptor,
  Controller, Get,
  Header,
  HttpException,
  HttpStatus,
  Inject, NotFoundException, Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request } from 'express';

import { AuthGuard } from '@src/auth/auth.guard';

import { UserService } from '@src/user/user.service';
import { LandMintedService } from '@src/land/land-minted/land-minted.service';

import { LandMintedCreateDto } from '@src/land/land-minted/land-minted-create.dto';

import { Public } from '@src/common/decorators/public.decorator';

@Controller('lands/minted')
export class LandMintedController {
  constructor(
    private landMintedService: LandMintedService,
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @Post()
  async book(
    @Req() request: Request,
    @Body() landMintedCreateDtos: LandMintedCreateDto[],
  ) {
    const wallet = request['user-wallet'];
    const user = await this.userService.findOne(wallet.toLowerCase());
    await this.cacheManager.del('land-get-all');
    try {
      return this.landMintedService.add(user, landMintedCreateDtos);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Cannot book your land',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Public()
  @Header('content-type', 'application/json')
  @Get('/:tokenId')
  async get(@Param('tokenId') tokenId: number) {
    try {
      return await this.landMintedService.getByTokenId(tokenId);
    } catch (error) {
      throw new NotFoundException('Cannot find land token id ' + tokenId);
    }
  }
}
