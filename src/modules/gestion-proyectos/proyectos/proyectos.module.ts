import { Module } from '@nestjs/common';
import { ProyectosService } from './services/proyectos.service';
import { ProyectosController } from './controllers/proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { TiposProyectosModule } from 'src/modules/catalogos/tipos-proyectos/tipos-proyectos.module';
import { LocalidadesProyectosModule } from '../localidades-proyectos/localidades-proyectos.module';
import { AyudasProyectosModule } from '../ayudas-proyectos/ayudas-proyectos.module';
import { ActoresProyectosModule } from '../actores-proyectos/actores-proyectos.module';
import { ConservacionAnimalesModule } from 'src/modules/gestion-conservacion/conservacion-animales/conservacion-animales.module';
import { ConservacionAgricolasModule } from 'src/modules/gestion-conservacion/conservacion-agricolas/conservacion-agricolas.module';
import { ComunidadesIndigenasAreasModule } from 'src/modules/gestion-comunidades/comunidades-indigenas-areas/comunidades-indigenas-areas.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Proyecto]),
		TiposProyectosModule,
		LocalidadesProyectosModule,
		AyudasProyectosModule,
		ActoresProyectosModule,
		ConservacionAnimalesModule,
		ConservacionAgricolasModule,
		ComunidadesIndigenasAreasModule,
	],
	controllers: [ProyectosController],
	providers: [ProyectosService],
	exports: [ProyectosService]
})
export class ProyectosModule { }
