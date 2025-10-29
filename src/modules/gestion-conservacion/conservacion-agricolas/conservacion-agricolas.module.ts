import { Module } from '@nestjs/common';
import { ConservacionAgricolasService } from './services/conservacion-agricolas.service';
import { ConservacionAgricolasController } from './controllers/conservacion-agricolas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservacionAgricola } from './entities/conservacion-agricola.entity';
import { PracticasAgricolasModule } from 'src/modules/catalogos/practicas-agricolas/practicas-agricolas.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ConservacionAgricola]),
		PracticasAgricolasModule
	],
	controllers: [ConservacionAgricolasController],
	providers: [ConservacionAgricolasService],
	exports: [ConservacionAgricolasService]
})
export class ConservacionAgricolasModule { }
