import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

export class CreateUserInputData {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsNotEmpty()
  marketingData: Record<string, unknown>;
}
