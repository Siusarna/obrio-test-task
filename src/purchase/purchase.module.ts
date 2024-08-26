import { Module } from '@nestjs/common';

import { PurchaseService } from './domain/purchase.service';
import { I_PURCHASE_REPOSITORY_TOKEN } from './domain/IPurchaseRepository';
import { PurchaseRepository } from './infra/DBs/in-memory/purchase.repository';
import { I_USER_REPORT_PROVIDER } from './domain/IUserReportProvider';
import { AnalyticsServiceHttpProvider } from './infra/providers/analytics-service/http-provider';
import { I_ANALYTICS_SERVICE_PROVIDER } from './domain/IAnalyticsServiceProvider';
import { UserReportHttpProvider } from './infra/providers/user-report/http-provider';
import { OfferModule } from '../offer/offer.module';
import { UserModule } from '../user/user.module';
import { PurchaseConsumer } from './infra/queue/purchase.consumer';
import { BullModule } from '@nestjs/bullmq';
import { PurchaseController } from './infra/api/purchase.controller';

@Module({
  controllers: [PurchaseController],
  providers: [
    {
      provide: I_PURCHASE_REPOSITORY_TOKEN,
      useClass: PurchaseRepository,
    },
    {
      provide: I_USER_REPORT_PROVIDER,
      useClass: UserReportHttpProvider,
    },
    {
      provide: I_ANALYTICS_SERVICE_PROVIDER,
      useClass: AnalyticsServiceHttpProvider,
    },
    PurchaseService,
    PurchaseConsumer,
  ],
  imports: [
    OfferModule,
    UserModule,
    BullModule.registerQueue({
      name: 'purchases',
    }),
  ],
})
export class PurchaseModule {}
