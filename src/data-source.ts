import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env variables if not using NestJS ConfigModule here

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),
  database: configService.get<string>('DB_DATABASE', 'testdb'),
  entities: [User],
  synchronize: true, // Set to false in production; migrations should be used instead
});
