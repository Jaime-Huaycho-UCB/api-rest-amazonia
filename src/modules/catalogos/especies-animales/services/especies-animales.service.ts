import { Injectable } from '@nestjs/common';
import { CreateEspeciesAnimaleDto } from '../dto/create-especies-animale.dto';
import { UpdateEspeciesAnimaleDto } from '../dto/update-especies-animale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecieAnimal } from '../entities/especie-animal.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class EspeciesAnimalesService {
	constructor(
		@InjectRepository(EspecieAnimal)
		private readonly especieAnimalRepository: Repository<EspecieAnimal>
	){}

	async findAll(selectTemplate: FindManyOptions<EspecieAnimal>){
		const especiesAnimales = await this.especieAnimalRepository.find({
			...selectTemplate
		})
		return especiesAnimales;
	}
}
