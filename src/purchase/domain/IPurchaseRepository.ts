import { Purchase } from './types/purchase.dto';

export interface IPurchaseRepository {
  create: (data: { offerId: number; userId: number }) => Promise<Purchase>;
  getById: (id: number) => Promise<Purchase>;
}

export const I_PURCHASE_REPOSITORY_TOKEN = Symbol('I_PURCHASE_REPOSITORY');
