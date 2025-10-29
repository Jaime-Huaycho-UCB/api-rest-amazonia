import { Module } from '@nestjs/common';
import { ConservacionAnimalesService } from './services/conservacion-animales.service';
import { ConservacionAnimalesController } from './controllers/conservacion-animales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservacionAnimal } from './entities/conservacion-animal.entity';
import { EspeciesAnimalesModule } from 'src/modules/catalogos/especies-animales/especies-animales.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ConservacionAnimal]),
		EspeciesAnimalesModule
	],
	controllers: [ConservacionAnimalesController],
	providers: [ConservacionAnimalesService],
	exports: [ConservacionAnimalesService]
})
export class ConservacionAnimalesModule { }
