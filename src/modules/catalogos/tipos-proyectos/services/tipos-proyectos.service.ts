import { Injectable } from '@nestjs/common';
import { CreateTiposProyectoDto } from '../dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from '../dto/update-tipos-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoProyecto } from '../entities/tipo-proyecto.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class TiposProyectosService {
	constructor(
		@InjectRepository(TipoProyecto)
		private readonly tipoProyectoRepository: Repository<TipoProyecto>
	){}

	async findAll(selectTemplate: FindManyOptions<TipoProyecto>){
		const tiposProyectos = await this.tipoProyectoRepository.find({
			...selectTemplate
		})
		return tiposProyectos;
	}
}
