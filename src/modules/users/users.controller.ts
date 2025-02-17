import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Permissions } from '@/shared/permissions/decorators';
import { PermissionsEnum } from '@/shared/permissions/enums';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Permissions(PermissionsEnum.EDIT_PARISH, PermissionsEnum.DELETE_PARISH)
  testDatabase() {
    return this.usersService.testDatabase();
  }

  @Get(':entityID')
  @Permissions(PermissionsEnum.TRANSFER_PRIEST)
  testDatabaseByID() {
    return this.usersService.testDatabase();
  }
}
