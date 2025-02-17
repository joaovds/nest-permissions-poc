import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

import { EnvService } from '@/shared/env/env.service';
import {
  DatabaseInterface,
  QueryResponse,
} from '@/shared/database/interfaces/database.interface';

@Injectable()
export class PgService
  implements DatabaseInterface, OnModuleInit, OnModuleDestroy
{
  private pool: Pool | null = null;

  constructor(private readonly envService: EnvService) {}

  async onModuleInit() {
    try {
      this.pool = new Pool({
        connectionString: this.envService.pg_url,
      });
      await this.pool.query('SELECT NOW()');
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw new Error('Database connection failed');
    }
  }

  private get poolInstance(): Pool {
    if (!this.pool) {
      throw new Error('Database connection pool is not initialized!');
    }
    return this.pool;
  }

  private async execute<T = any>(query: string, params?: any[]): Promise<T> {
    const client = await this.poolInstance.connect();
    try {
      const res = await client.query(query, params);
      return res.rows as T;
    } finally {
      client.release();
    }
  }

  query<T>(queryStr: string, params?: any[]): QueryResponse<T> {
    return {
      getOne: async () => {
        const results = await this.execute(queryStr, params);
        return results.length > 0 ? results[0] : null;
      },
      getMany: async () => {
        return this.execute(queryStr, params);
      },
    };
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
