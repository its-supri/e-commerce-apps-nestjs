import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { databaseProviders } from './database.providers';

describe('Database Connection', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...databaseProviders],
    }).compile();

    dataSource = module.get<DataSource>('DATA_SOURCE');
  });

  it('should be defined', () => {
    expect(dataSource).toBeDefined();
  });

  it('should be initialized', async () => {
    const isInitialized = dataSource.isInitialized;
    expect(isInitialized).toBe(true);
  });

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });
});
