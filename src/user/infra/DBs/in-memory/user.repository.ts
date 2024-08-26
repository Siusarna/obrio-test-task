import { IUserRepository } from '../../../domain/IUserRepository';
import { User } from '../../../domain/types/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly users: User[] = [];

  async create(data): Promise<User> {
    const user = {
      id: this.users.length + 1,
      email: data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async getByEmail(email): Promise<User> {
    return this.users.find((el) => el.email === email);
  }

  async getById(id: number): Promise<User> {
    return this.users.find((el) => el.id === id);
  }
}
