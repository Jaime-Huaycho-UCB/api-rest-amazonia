import { Module } from '@nestjs/common';
import { ComunidadesIndigenasAreasService } from './services/comunidades-indigenas-areas.service';
import { ComunidadesIndigenasAreasController } from './controllers/comunidades-indigenas-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadIndigenaArea } from './entities/comunidad-indigena-area.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComunidadIndigenaArea])
	],
	controllers: [ComunidadesIndigenasAreasController],
	providers: [ComunidadesIndigenasAreasService],
})
export class ComunidadesIndigenasAreasModule { }
