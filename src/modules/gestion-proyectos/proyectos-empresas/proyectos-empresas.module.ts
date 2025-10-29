import { Module } from '@nestjs/common';
import { ProyectosEmpresasService } from './services/proyectos-empresas.service';
import { ProyectosEmpresasController } from './controllers/proyectos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEmpresa } from './entities/proyecto-empresa.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProyectoEmpresa]),
		ProyectosModule,
	],
	controllers: [ProyectosEmpresasController],
	providers: [ProyectosEmpresasService],
	exports: [ProyectosEmpresasService],
})
export class ProyectosEmpresasModule { }
