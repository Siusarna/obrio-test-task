import { Inject, Injectable } from '@nestjs/common';
import { I_OFFER_REPOSITORY_TOKEN, IOfferRepository } from './IOfferRepository';
import { Offer } from './types/offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @Inject(I_OFFER_REPOSITORY_TOKEN)
    private readonly offerRepository: IOfferRepository,
  ) {}

  async getOfferById(id: number): Promise<Offer> {
    return this.offerRepository.getById(id);
  }
}
