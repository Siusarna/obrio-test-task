import { IPurchaseRepository } from '../../../domain/IPurchaseRepository';
import { Injectable } from '@nestjs/common';
import { Purchase } from '../../../domain/types/purchase.dto';

@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  private readonly purchases: Purchase[] = [];

  async create(data): Promise<Purchase> {
    const purchase = {
      id: this.purchases.length + 1,
      offerId: data.offerId,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.purchases.push(purchase);

    return purchase;
  }

  async getById(id): Promise<Purchase> {
    return this.purchases.find((p) => p.id === id);
  }
}
