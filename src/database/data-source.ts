import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { entities } from './entities';

dotenv.config();
export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mongodb') || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'hr_system',
  synchronize: true,
  logging: true,
  entities: entities,
  migrations: ['src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
