import { Module } from '@nestjs/common';
import { DepartamentosEmpresasService } from './services/departamentos-empresas.service';
import { DepartamentosEmpresasController } from './controllers/departamentos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEmpresa } from './entities/departamento-empresa.entity';
import { DepartamentosModule } from 'src/modules/ubicaciones-geograficas/departamentos/departamentos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([DepartamentoEmpresa]),
		DepartamentosModule,
	],
	controllers: [DepartamentosEmpresasController],
	providers: [DepartamentosEmpresasService],
	exports: [DepartamentosEmpresasService]
})
export class DepartamentosEmpresasModule { }
