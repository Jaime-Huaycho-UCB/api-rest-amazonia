import { Module } from '@nestjs/common';
import { ProyectosOrganizacionesService } from './services/proyectos-organizaciones.service';
import { ProyectosOrganizacionesController } from './controllers/proyectos-organizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoOrganizacion } from './entities/proyecto-organizacion.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ProyectoOrganizacion])
	],
	controllers: [ProyectosOrganizacionesController],
	providers: [ProyectosOrganizacionesService],
})
export class ProyectosOrganizacionesModule { }
