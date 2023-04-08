import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintPackageService } from './mint-package.service';
import { MintPackageController } from './mint-package.controller';
import { MintPackage } from './mint-package.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MintPackage])],
    exports: [TypeOrmModule],
    providers: [MintPackageService],
    controllers: [MintPackageController],
})

export class MintPackageModule {}