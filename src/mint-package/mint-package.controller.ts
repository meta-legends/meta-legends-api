import { Controller, Header, Get, Patch, Param } from '@nestjs/common';
import {MintPackageService} from "./mint-package.service";


@Controller('mint-package')
export class MintPackageController {
    constructor(private mintPackageService: MintPackageService) {}

    @Header('content-type', 'application/json')
    @Get(':walletAddress')
    findOne(@Param('walletAddress') walletAddress: string) {
        return this.mintPackageService.getOneByFromMintWallet(walletAddress);
    }
}
