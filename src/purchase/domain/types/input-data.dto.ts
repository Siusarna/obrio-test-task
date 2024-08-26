import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePurchaseInputData {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  offerId: number;
}
