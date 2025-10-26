import { Module } from '@nestjs/common';
import { ConservacionAgricolasService } from './services/conservacion-agricolas.service';
import { ConservacionAgricolasController } from './controllers/conservacion-agricolas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservacionAgricola } from './entities/conservacion-agricola.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ConservacionAgricola])
	],
	controllers: [ConservacionAgricolasController],
	providers: [ConservacionAgricolasService],
})
export class ConservacionAgricolasModule { }
