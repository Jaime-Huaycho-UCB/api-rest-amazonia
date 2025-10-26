import { Module } from '@nestjs/common';
import { AyudasProyectosService } from './services/ayudas-proyectos.service';
import { AyudasProyectosController } from './controllers/ayudas-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AyudaProyecto } from './entities/ayuda-proyecto.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([AyudaProyecto])
	],
	controllers: [AyudasProyectosController],
	providers: [AyudasProyectosService],
})
export class AyudasProyectosModule { }
