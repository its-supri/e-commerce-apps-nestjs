import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dbSync = configService.get<string>('DB_SYNC', 'false'); // Get as string
      const synchronize = dbSync.toLowerCase() === 'true'; // Convert to boolean

      const dataSource = new DataSource({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize, // Use parsed boolean
      });

      return dataSource.initialize();
    },
  },
];