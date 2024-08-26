import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  I_PURCHASE_REPOSITORY_TOKEN,
  IPurchaseRepository,
} from './IPurchaseRepository';
import { CreatePurchaseInputData } from './types/input-data.dto';
import { UserService } from '../../user/domain/user.service';
import { OfferService } from '../../offer/domain/offer.service';
import { Purchase } from './types/purchase.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  I_USER_REPORT_PROVIDER,
  IUserReportProvider,
} from './IUserReportProvider';
import {
  I_ANALYTICS_SERVICE_PROVIDER,
  IAnalyticsServiceProvider,
} from './IAnalyticsServiceProvider';

@Injectable()
export class PurchaseService {
  private readonly logger = new Logger(PurchaseService.name);
  constructor(
    @Inject(I_PURCHASE_REPOSITORY_TOKEN)
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly userService: UserService,
    private readonly offerService: OfferService,
    @InjectQueue('purchases') private purchasesQueue: Queue,
    @Inject(I_USER_REPORT_PROVIDER)
    private readonly userReportProvider: IUserReportProvider,
    @Inject(I_ANALYTICS_SERVICE_PROVIDER)
    private readonly analyticsServiceProvider: IAnalyticsServiceProvider,
  ) {}

  async create(data: CreatePurchaseInputData): Promise<Purchase> {
    const [user, offer] = await Promise.all([
      this.userService.getUserById(data.userId),
      this.offerService.getOfferById(data.offerId),
    ]);

    if (!user) {
      throw new UnprocessableEntityException({
        message: `User with id ${data.userId} doesn't exists`,
      });
    }

    if (!offer) {
      throw new UnprocessableEntityException({
        message: `Offer with id ${data.userId} doesn't exists`,
      });
    }

    const purchase = await this.purchaseRepository.create(data);

    await this.purchasesQueue.add('processPurchase', {
      purchaseId: purchase.id,
    });

    return purchase;
  }

  async getById(id: number): Promise<Purchase> {
    return this.purchaseRepository.getById(id);
  }

  async processPurchase({ purchaseId }: { purchaseId: number }): Promise<void> {
    const purchase = await this.getById(purchaseId);
    if (!purchase) {
      this.logger.error(
        `Trying to process non-existent purchase with id ${purchaseId}`,
      );
      return;
    }

    const results = await Promise.allSettled([
      this.userReportProvider.sendReport({
        purchaseId: purchaseId,
        reportData: { some: 'data' },
      }),
      this.analyticsServiceProvider.sendEvent(purchase),
    ]);

    const { success, failed } = results.reduce(
      (acc: { success: unknown[]; failed: unknown[] }, curr) => {
        curr.status === 'fulfilled'
          ? acc.success.push(curr)
          : acc.failed.push(curr);
        return acc;
      },
      { success: [], failed: [] },
    );

    this.logger.log(
      `Process purchase with id = ${purchaseId}: success requests = ${success.length}, failed requests = ${failed.length}`,
    );
  }
}
