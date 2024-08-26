import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from '../../domain/types/user.dto';
import { UserService } from '../../domain/user.service';
import { CreateUserInputData } from '../../domain/types/input-data.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Create new user',
  })
  @Post()
  async creatUser(@Body() body: CreateUserInputData): Promise<User> {
    return this.userService.createUser(body);
  }
}
