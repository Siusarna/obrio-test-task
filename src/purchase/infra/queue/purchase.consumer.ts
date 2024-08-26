import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PurchaseService } from '../../domain/purchase.service';

@Processor('purchases')
export class PurchaseConsumer extends WorkerHost {
  private readonly logger = new Logger(PurchaseConsumer.name);
  constructor(private readonly purchaseService: PurchaseService) {
    super();
  }

  async process(job: Job<unknown>): Promise<void> {
    switch (job.name) {
      case 'processPurchase': {
        await this.purchaseService.processPurchase(
          job.data as { purchaseId: number },
        );
        break;
      }
      default: {
        this.logger.error(`No handle for job ${job.name}`);
        break;
      }
    }
  }
}
