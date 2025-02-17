import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

import { loadEnvConfig, EnvConfig } from './env.config';

@Injectable()
export class EnvService {
  private readonly env: EnvConfig;

  constructor() {
    config();
    this.env = loadEnvConfig();
  }

  get pg_url(): string {
    return this.env.PG_URL;
  }

  get port(): number {
    return this.env.PORT;
  }
}
