import { Module } from '@nestjs/common';
import { ProyectosService } from './services/proyectos.service';
import { ProyectosController } from './controllers/proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Proyecto])
	],
	controllers: [ProyectosController],
	providers: [ProyectosService],
})
export class ProyectosModule { }
