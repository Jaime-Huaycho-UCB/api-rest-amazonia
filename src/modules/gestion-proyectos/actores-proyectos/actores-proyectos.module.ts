import { Module } from '@nestjs/common';
import { ActoresProyectosService } from './services/actores-proyectos.service';
import { ActoresProyectosController } from './controllers/actores-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorProyecto } from './entities/actor-proyecto.entity';
import { ActoresMunicipalesModule } from 'src/modules/catalogos/actores-municipales/actores-municipales.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ActorProyecto]),
		ActoresMunicipalesModule,
	],
	controllers: [ActoresProyectosController],
	providers: [ActoresProyectosService],
	exports: [ActoresProyectosService],
})
export class ActoresProyectosModule { }
