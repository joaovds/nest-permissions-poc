import { Global, Module } from '@nestjs/common';

import { DATABASE_SERVICE } from '@/shared/database/tokens';
import { PgService } from './pg.service';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_SERVICE,
      useClass: PgService,
    },
  ],
  exports: [DATABASE_SERVICE],
})
export class PgModule {}
