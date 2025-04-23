import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';

describe('Database Connection', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [...databaseProviders],
    }).compile();

    dataSource = module.get<DataSource>('DATA_SOURCE');
  });

  it('should be defined', () => {
    expect(dataSource).toBeDefined();
  });

  it('should be initialized', async () => {
    expect(dataSource.isInitialized).toBe(true);
  });

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });
});
