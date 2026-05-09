import { Module } from '@nestjs/common';
import { MyConfigModule } from './infrastructure/config/config.module';
import { MyDatabaseModule } from './infrastructure/database/database.module';
import { LoadTestingModule } from './load-testing/load-testing.module';

const isLoadTestMode =
  process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOAD_TEST === 'true';

@Module({
	imports: [
		MyConfigModule,
		MyDatabaseModule,
		...(isLoadTestMode ? [LoadTestingModule] : []),
	],
})
export class AppModule { }
