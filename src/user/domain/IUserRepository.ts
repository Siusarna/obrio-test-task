import { User } from './types/user.dto';

export interface IUserRepository {
  create: (data: {
    email: string;
    marketingData: Record<string, unknown>;
  }) => Promise<User>;
  getByEmail: (email: string) => Promise<User>;
  getById: (id: number) => Promise<User>;
}

export const I_USER_REPOSITORY_TOKEN = Symbol('I_USER_REPOSITORY');
