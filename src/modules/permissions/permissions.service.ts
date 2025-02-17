import { Injectable } from '@nestjs/common';

import { PgService } from '@/shared/database/pg/pg.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly pg: PgService) {}

  async testDatabase() {
    const users = await this.pg.query('select * from users where id = $1', [4]);

    return users;
  }
}
