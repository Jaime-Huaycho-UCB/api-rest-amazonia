import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from '../entities/municipio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipiosService {
	constructor(
		@InjectRepository(Municipio)
		private readonly municipioRepository: Repository<Municipio>
	){}

	async findAll(){
		const municipios = await this.municipioRepository.find({
			select: {
				id: true,
				nombre: true
			}
		})
		return municipios;
	}
}
