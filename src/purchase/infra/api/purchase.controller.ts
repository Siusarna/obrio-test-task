import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PurchaseService } from '../../domain/purchase.service';
import { CreatePurchaseInputData } from '../../domain/types/input-data.dto';
import { Purchase } from '../../domain/types/purchase.dto';

@ApiTags('Purchases')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiOperation({
    description: 'Create new purchase',
  })
  @Post()
  async creatPurchase(
    @Body() body: CreatePurchaseInputData,
  ): Promise<Purchase> {
    return this.purchaseService.create(body);
  }
}
