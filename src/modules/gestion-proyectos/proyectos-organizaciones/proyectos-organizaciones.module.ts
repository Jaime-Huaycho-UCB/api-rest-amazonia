import { Module } from '@nestjs/common';
import { ProyectosOrganizacionesService } from './services/proyectos-organizaciones.service';
import { ProyectosOrganizacionesController } from './controllers/proyectos-organizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoOrganizacion } from './entities/proyecto-organizacion.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProyectoOrganizacion]),
		ProyectosModule
	],
	controllers: [ProyectosOrganizacionesController],
	providers: [ProyectosOrganizacionesService],
	exports: [ProyectosOrganizacionesService]
})
export class ProyectosOrganizacionesModule { }
