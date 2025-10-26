import { Module } from '@nestjs/common';
import { EmpresasService } from './services/empresas.service';
import { EmpresasController } from './controllers/empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Empresa])
	],
	controllers: [EmpresasController],
	providers: [EmpresasService],
})
export class EmpresasModule { }
