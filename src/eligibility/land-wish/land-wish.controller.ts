import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { LandWishCreateDto } from '@src/eligibility/land-wish/land-wish-create.dto';
import { LandWishService } from '@src/eligibility/land-wish/land-wish.service';
import { Request } from 'express';
import { UserService } from '@src/user/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('land-wishes')
export class LandWishController {
  constructor(
    private landWishService: LandWishService,
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @Post()
  async book(
    @Req() request: Request,
    @Body() landWishCreateDtos: LandWishCreateDto[],
  ) {
    const wallet = request['user-wallet'];
    const user = await this.userService.findOne(wallet.toLowerCase());
    await this.cacheManager.del('land-get-all');
    try {
      return this.landWishService.add(user, landWishCreateDtos);
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @Get()
  getAll() {
    return this.landWishService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.landWishService.get(id);
  }
}
