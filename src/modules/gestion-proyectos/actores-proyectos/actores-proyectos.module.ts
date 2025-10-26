import { Module } from '@nestjs/common';
import { ActoresProyectosService } from './services/actores-proyectos.service';
import { ActoresProyectosController } from './controllers/actores-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorProyecto } from './entities/actor-proyecto.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ActorProyecto])
	],
	controllers: [ActoresProyectosController],
	providers: [ActoresProyectosService],
})
export class ActoresProyectosModule { }
