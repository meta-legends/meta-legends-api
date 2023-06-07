import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@src/auth/auth.guard';

import { User } from '@src/user/user.entity';

import { UserService } from '@src/user/user.service';
import { AssetService } from '@src/asset/asset.service';
import { MintOrderService } from '@src/mint-order/mint-order.service';
import { MintOrderPositionUpdateDto } from '@src/mint-order/mint-order-position-update.dto';

@Controller('mint-orders')
export class MintOrderController {
  constructor(
    private userService: UserService,
    private assetService: AssetService,
    private mintOrderService: MintOrderService,
  ) {}

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Get(':assetCode')
  async get(@Req() request: Request, @Param('assetCode') assetCode: string) {
    const user = await this.userService.findOne(request['user-wallet']);
    const asset = await this.assetService.findOneByCode(assetCode);

    const mintOrders = await this.mintOrderService.findByUserAndAsset(
      user,
      asset,
    );
    if (mintOrders == null) {
      throw new NotFoundException(
        `User ${user.wallet} is not eligible to ${asset.name}`,
      );
    }

    return mintOrders;
  }

  @UseGuards(AuthGuard)
  @Header('content-type', 'application/json')
  @Patch(':assetCode')
  async update(
    @Req() request: Request,
    @Body(new ParseArrayPipe({ items: MintOrderPositionUpdateDto }))
    mintOrderPositionUpdateDtos: MintOrderPositionUpdateDto[],
    @Param('assetCode') assetCode: string,
  ) {
    const user: User = await this.userService.findOne(request['user-wallet']);
    const asset = await this.assetService.findOneByCode(assetCode);
    const mintOrders = await this.mintOrderService.findByUserAndAsset(
      user,
      asset,
    );
    return await this.mintOrderService.updatePosition(
      mintOrders,
      mintOrderPositionUpdateDtos,
    );
  }
}
