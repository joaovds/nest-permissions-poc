import { Module } from '@nestjs/common';

import { PgModule } from '@/shared/database/pg/pg.module';
import { EnvModule } from '@/shared/env/env.module';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [PgModule, EnvModule, PermissionsModule],
})
export class AppModule {}
