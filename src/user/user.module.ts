import { Module } from '@nestjs/common';

import { UserController } from './infra/api/user.controller';
import { UserService } from './domain/user.service';
import { I_USER_REPOSITORY_TOKEN } from './domain/IUserRepository';
import { UserRepository } from './infra/DBs/in-memory/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: I_USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
