import { IOfferRepository } from '../../../domain/IOfferRepository';
import { Injectable } from '@nestjs/common';
import { Offer } from '../../../domain/types/offer.dto';

@Injectable()
export class OfferRepository implements IOfferRepository {
  private readonly OFFERS_LENGTH = 5;
  private readonly offers: Offer[] = Array(this.OFFERS_LENGTH);

  constructor() {
    this.seedingOffers();
  }

  async getById(id: number): Promise<Offer> {
    return this.offers.find((el) => el.id === id);
  }

  private seedingOffers() {
    let i = 1;
    this.offers.fill({
      id: i,
      name: `Offer number ${i}`,
      price: 100 * i++,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
