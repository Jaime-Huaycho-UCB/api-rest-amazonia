import { Injectable } from '@nestjs/common';
import { CreateAreasDesarrolloDto } from '../dto/create-areas-desarrollo.dto';
import { UpdateAreasDesarrolloDto } from '../dto/update-areas-desarrollo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaDesarrollo } from '../entities/area-desarrollo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasDesarrolloService {
	constructor(
		@InjectRepository(AreaDesarrollo)
		private readonly areaDesarrolloRepository: Repository<AreaDesarrollo>
	){}

	async findAll(){
		const areasDesarrollo = await this.areaDesarrolloRepository.find({
			select: {
				id: true,
				nombre: true
			},
		})
		return areasDesarrollo;
	}
}
