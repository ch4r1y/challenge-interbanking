import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'sqlite',
      database: config.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: false,
      logging: config.get<string>('DB_LOGGING') === 'true',
    };
  },
};
