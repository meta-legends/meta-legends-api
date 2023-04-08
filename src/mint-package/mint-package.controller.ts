import {
    Controller, Header, Get, Patch, Param,
    Body, Req, NotFoundException
} from '@nestjs/common';

import {MintPackageService} from "./mint-package.service";
import {MintPackageUpdateDto} from "./mint-package-update.dto";
import { Request } from 'express';

@Controller('mint-package')
export class MintPackageController {
    constructor(private mintPackageService: MintPackageService) {}

    @Header('content-type', 'application/json')
    @Get('search')
    search(@Req() request: Request) {
        const walletAddress = request.query['wallet'].toString().toLowerCase();
        return this.mintPackageService.getByFromMintWallet(walletAddress);
    }

    @Header('content-type', 'application/json')
    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.mintPackageService.findOneById(id);
    }

    @Header('content-type', 'application/json')
    @Patch(':id')
    async updateMintWallet(@Param('id') id: number,
                           @Body() mintPackageUpdateDto: MintPackageUpdateDto) {
        const mintPackage = await this.mintPackageService.findOneById(id);

        if (!mintPackage) {
            throw new NotFoundException(`Mint package with id ${id} not found`);
        }

        return this.mintPackageService.update(mintPackage, mintPackageUpdateDto);
    }
}
