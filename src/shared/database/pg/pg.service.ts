import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { EnvService } from '@/shared/env/env.service';

@Injectable()
export class PgService implements OnModuleInit, OnModuleDestroy {
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

  async query<T = any>(query: string, params?: any[]): Promise<T> {
    const client = await this.poolInstance.connect();
    try {
      const res = await client.query(query, params);
      return res.rows as T;
    } finally {
      client.release();
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
