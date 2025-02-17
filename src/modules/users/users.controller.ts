import { Controller, Get } from '@nestjs/common';

import { Permissions } from '@/shared/permissions/decorators';
import { PermissionsEnum } from '@/shared/permissions/enums';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  testDatabase() {
    return this.usersService.testDatabase();
  }

  @Get(':entityID')
  @Permissions(PermissionsEnum.TRANSFER_PRIEST)
  testDatabaseByID() {
    return this.usersService.testDatabase();
  }
}
