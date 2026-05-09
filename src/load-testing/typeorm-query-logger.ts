import { Logger, QueryRunner } from 'typeorm';
import { incrementQueryCount } from './metrics.store';

export class MetricsQueryLogger implements Logger {
  logQuery(_query: string, _parameters?: any[], _queryRunner?: QueryRunner): any {
    incrementQueryCount();
  }

  logQueryError(
    _error: string | Error,
    _query: string,
    _parameters?: any[],
    _queryRunner?: QueryRunner,
  ): any {}

  logQuerySlow(
    _time: number,
    _query: string,
    _parameters?: any[],
    _queryRunner?: QueryRunner,
  ): any {}

  logSchemaBuild(_message: string, _queryRunner?: QueryRunner): any {}

  logMigration(_message: string, _queryRunner?: QueryRunner): any {}

  log(_level: 'log' | 'info' | 'warn', _message: any, _queryRunner?: QueryRunner): any {}
}
