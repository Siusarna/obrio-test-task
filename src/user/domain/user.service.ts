import { CreateUserInputData } from './types/input-data.dto';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { I_USER_REPOSITORY_TOKEN, IUserRepository } from './IUserRepository';
import { User } from './types/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(I_USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(data: CreateUserInputData): Promise<User> {
    const potentialUser = await this.userRepository.getByEmail(data.email);
    if (potentialUser) {
      throw new UnprocessableEntityException({
        message: `User with email ${data.email} already exists`,
      });
    }

    return this.userRepository.create(data);
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getById(id);
  }
}
