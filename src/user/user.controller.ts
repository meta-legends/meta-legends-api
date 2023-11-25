import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Patch,
  Body,
  NotFoundException,
  UseGuards,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes, ClassSerializerInterceptor, UseInterceptors
} from "@nestjs/common";
import { UserService } from '../user/user.service';
import { UserUpdateDto } from '../user/user-update.dto';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Header('content-type', 'application/json')
  @Get(':wallet/is-holder')
  async isHolder(@Param('wallet') wallet: string) {
    return await this.userService.isHolder(wallet.toLowerCase());
  }

  @Header('content-type', 'application/json')
  @Post(':wallet')
  async upsert(@Param('wallet') wallet: string) {
    return this.userService.upsert(wallet.toLowerCase());
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() userUpdateDto: UserUpdateDto) {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    try {
      return this.userService.update(user, userUpdateDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This is a custom message',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
