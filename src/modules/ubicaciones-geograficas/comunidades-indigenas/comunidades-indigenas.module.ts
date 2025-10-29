import { Module } from '@nestjs/common';
import { ComunidadesIndigenasService } from './services/comunidades-indigenas.service';
import { ComunidadesIndigenasController } from './controllers/comunidades-indigenas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadIndigena } from './entities/comunidad-indigena.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComunidadIndigena])
	],
	controllers: [ComunidadesIndigenasController],
	providers: [ComunidadesIndigenasService],
	exports: [ComunidadesIndigenasService]
})
export class ComunidadesIndigenasModule { }
