import { Module } from '@nestjs/common';
import { ConservacionAnimalesService } from './services/conservacion-animales.service';
import { ConservacionAnimalesController } from './controllers/conservacion-animales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservacionAnimal } from './entities/conservacion-animal.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ConservacionAnimal])
	],
	controllers: [ConservacionAnimalesController],
	providers: [ConservacionAnimalesService],
})
export class ConservacionAnimalesModule { }
