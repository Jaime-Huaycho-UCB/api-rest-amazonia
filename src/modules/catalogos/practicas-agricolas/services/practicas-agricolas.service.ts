import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PracticaAgricola } from '../entities/practica-agricola.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PracticasAgricolasService {
	constructor(
		@InjectRepository(PracticaAgricola)
		private readonly practicaAgricolaRepository: Repository<PracticaAgricola>
	){}

	async findAll(selectTemplate: FindManyOptions<PracticaAgricola>){
		const practicasAgricolas = await this.practicaAgricolaRepository.find({
			...selectTemplate
		})
		return practicasAgricolas;
	}
}
