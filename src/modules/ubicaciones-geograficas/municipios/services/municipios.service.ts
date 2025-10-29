import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from '../entities/municipio.entity';
import { In, Repository } from 'typeorm';
import { MyBadRequestException } from 'src/shared/exceptions';

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

	async findAllByIds(ids: number[]){
		const municipios = await this.municipioRepository.find({
			where: {
				id: In(ids),
			},
			select: {
				id: true,
				nombre: true,
				comunidadesIndigenas: {
					id: true,
					nombre: true
				}
			},
			relations: {
				comunidadesIndigenas: true
			}
		})
		if (municipios.length !== ids.length){
			throw new MyBadRequestException('Solo se aceptan IDs de municipios validos');
		}
		return municipios;
	}
}
