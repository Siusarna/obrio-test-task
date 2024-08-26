import { Module } from '@nestjs/common';

import { OfferService } from './domain/offer.service';
import { I_OFFER_REPOSITORY_TOKEN } from './domain/IOfferRepository';
import { OfferRepository } from './infra/DBs/in-memory/offer.repository';

@Module({
  providers: [
    {
      provide: I_OFFER_REPOSITORY_TOKEN,
      useClass: OfferRepository,
    },
    OfferService,
  ],
  exports: [OfferService],
})
export class OfferModule {}
