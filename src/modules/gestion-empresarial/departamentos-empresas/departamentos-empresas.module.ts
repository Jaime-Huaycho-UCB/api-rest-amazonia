import { Module } from '@nestjs/common';
import { DepartamentosEmpresasService } from './services/departamentos-empresas.service';
import { DepartamentosEmpresasController } from './controllers/departamentos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEmpresa } from './entities/departamento-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([DepartamentoEmpresa])
	],
	controllers: [DepartamentosEmpresasController],
	providers: [DepartamentosEmpresasService],
})
export class DepartamentosEmpresasModule { }
