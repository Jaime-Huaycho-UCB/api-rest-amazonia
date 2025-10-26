import { Module } from '@nestjs/common';
import { LocalidadesProyectosService } from './services/localidades-proyectos.service';
import { LocalidadesProyectosController } from './controllers/localidades-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadProyecto } from './entities/localidad-proyecto.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([LocalidadProyecto])
	],
	controllers: [LocalidadesProyectosController],
	providers: [LocalidadesProyectosService],
})
export class LocalidadesProyectosModule { }
