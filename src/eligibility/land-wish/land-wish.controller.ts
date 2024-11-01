import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus, Param,
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
import {OgLandService} from "@src/eligibility/og-land/og-land.service";

@Controller('land-wishes')
export class LandWishController {
  constructor(
    private landWishService: LandWishService,
    private landService: OgLandService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @Post()
  async book(
    @Req() request: Request,
    @Body() landWishCreateDto: LandWishCreateDto,
  ) {
    const wallet = request['user-wallet'];
    const user = await this.userService.findOne(wallet.toLowerCase());
    try {
      return this.landWishService.add(user, landWishCreateDto);
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
}
