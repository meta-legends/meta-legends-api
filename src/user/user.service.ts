import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {UserCreateDto} from "./user-create.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findOne(wallet: string) {
    return await this.userRepository.findOneBy({ wallet });
  }

  async create(userCreateDto: UserCreateDto) {
    return await this.userRepository.create();
  }
}
