import { Module } from '@nestjs/common';
import { LocalidadesProyectosService } from './services/localidades-proyectos.service';
import { LocalidadesProyectosController } from './controllers/localidades-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadProyecto } from './entities/localidad-proyecto.entity';
import { MunicipiosModule } from 'src/modules/ubicaciones-geograficas/municipios/municipios.module';
import { ComunidadesIndigenasModule } from 'src/modules/ubicaciones-geograficas/comunidades-indigenas/comunidades-indigenas.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([LocalidadProyecto]),
		MunicipiosModule,
		ComunidadesIndigenasModule
	],
	controllers: [LocalidadesProyectosController],
	providers: [LocalidadesProyectosService],
	exports: [LocalidadesProyectosService]
})
export class LocalidadesProyectosModule { }
