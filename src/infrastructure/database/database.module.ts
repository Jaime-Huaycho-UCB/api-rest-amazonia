// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from '../config/config.module';
import { MyDataBaseConfig } from '../config/services/database.config';
import { MetricsQueryLogger } from 'src/load-testing/typeorm-query-logger';

const isLoadTestMode =
  process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOAD_TEST === 'true';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [MyConfigModule],
            inject: [MyDataBaseConfig],
            useFactory: (configService: MyDataBaseConfig) => {
                const dbConfig = configService.get();
                return {
                    type: (dbConfig.type ?? 'postgres') as any,
                    host: dbConfig.host ?? undefined,
                    port: dbConfig.port,
                    username: dbConfig.username ?? undefined,
                    password: dbConfig.password ?? undefined,
                    database: dbConfig.database ?? undefined,
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: isLoadTestMode ? ['query'] : (dbConfig.logging ?? false),
                    logger: isLoadTestMode ? new MetricsQueryLogger() : undefined,
                };
            },
        }),
    ],
})
export class MyDatabaseModule { }
