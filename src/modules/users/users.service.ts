import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_SERVICE } from '@/shared/database/tokens';
import { DatabaseInterface } from '@/shared/database/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly pg: DatabaseInterface,
  ) {}

  async testDatabase() {
    const users = await this.pg
      .query('select * from users where id = $1', [4])
      .getOne();

    return users;
  }
}
