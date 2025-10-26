import { Module } from '@nestjs/common';
import { ProyectosEmpresasService } from './services/proyectos-empresas.service';
import { ProyectosEmpresasController } from './controllers/proyectos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEmpresa } from './entities/proyecto-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProyectoEmpresa])
	],
	controllers: [ProyectosEmpresasController],
	providers: [ProyectosEmpresasService],
})
export class ProyectosEmpresasModule { }
