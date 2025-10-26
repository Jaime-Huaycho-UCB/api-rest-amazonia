import { Injectable } from '@nestjs/common';
import { CreateActoresMunicipaleDto } from '../dto/create-actores-municipale.dto';
import { UpdateActoresMunicipaleDto } from '../dto/update-actores-municipale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorMunicipal } from '../entities/actor-municipal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActoresMunicipalesService {
	constructor(
		@InjectRepository(ActorMunicipal)
		private readonly actorMunicipalRepository: Repository<ActorMunicipal>
	){}

	create(createActoresMunicipaleDto: CreateActoresMunicipaleDto) {
		return 'This action adds a new actoresMunicipale';
	}

	findAll() {
		return `This action returns all actoresMunicipales`;
	}

	findOne(id: number) {
		return `This action returns a #${id} actoresMunicipale`;
	}

	update(id: number, updateActoresMunicipaleDto: UpdateActoresMunicipaleDto) {
		return `This action updates a #${id} actoresMunicipale`;
	}

	remove(id: number) {
		return `This action removes a #${id} actoresMunicipale`;
	}
}
