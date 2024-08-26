import { Offer } from './types/offer.dto';

export interface IOfferRepository {
  getById: (id: number) => Promise<Offer>;
}

export const I_OFFER_REPOSITORY_TOKEN = Symbol('I_OFFER_REPOSITORY');
