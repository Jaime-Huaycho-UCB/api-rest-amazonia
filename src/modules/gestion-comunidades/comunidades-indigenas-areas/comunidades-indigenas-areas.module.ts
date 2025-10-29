import { Module } from '@nestjs/common';
import { ComunidadesIndigenasAreasService } from './services/comunidades-indigenas-areas.service';
import { ComunidadesIndigenasAreasController } from './controllers/comunidades-indigenas-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadIndigenaArea } from './entities/comunidad-indigena-area.entity';
import { AreasDesarrolloModule } from 'src/modules/catalogos/areas-desarrollo/areas-desarrollo.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComunidadIndigenaArea]),
		AreasDesarrolloModule,
	],
	controllers: [ComunidadesIndigenasAreasController],
	providers: [ComunidadesIndigenasAreasService],
	exports: [ComunidadesIndigenasAreasService]
})
export class ComunidadesIndigenasAreasModule { }
