import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInputData {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
