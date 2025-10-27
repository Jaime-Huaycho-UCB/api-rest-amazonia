import { Module } from '@nestjs/common';
import { ComunidadesMunicipiosService } from './services/comunidades-municipios.service';
import { ComunidadesMunicipiosController } from './controllers/comunidades-municipios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadMunicipio } from './entities/comunidad-municipio.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComunidadMunicipio])
	],
	controllers: [ComunidadesMunicipiosController],
	providers: [ComunidadesMunicipiosService],
})
export class ComunidadesMunicipiosModule { }
