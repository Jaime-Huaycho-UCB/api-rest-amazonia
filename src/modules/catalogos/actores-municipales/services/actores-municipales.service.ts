import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorMunicipal } from '../entities/actor-municipal.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class ActoresMunicipalesService {
	constructor(
		@InjectRepository(ActorMunicipal)
		private readonly actorMunicipalRepository: Repository<ActorMunicipal>
	){}

	async findAll(selectTemplate: FindManyOptions<ActorMunicipal>){
		const actoresMunicipales = await this.actorMunicipalRepository.find({
			...selectTemplate
		})
		return actoresMunicipales;
	}

}
