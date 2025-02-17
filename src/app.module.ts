import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PgModule } from '@/shared/database/pg/pg.module';
import { EnvModule } from '@/shared/env/env.module';
import { PermissionsModule } from '@/shared/permissions/permissions.module';
import { PermissionsGuard } from '@/shared/permissions/guards';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [PgModule, EnvModule, UsersModule, PermissionsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
