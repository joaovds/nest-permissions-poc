import { plainToInstance, Transform } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class EnvConfig {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  PORT!: number;

  @IsString()
  PG_URL!: string;
}

export function loadEnvConfig(): EnvConfig {
  const envConfig = plainToInstance(EnvConfig, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(envConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Invalid config: ${JSON.stringify(errors)}`);
  }

  return envConfig;
}
