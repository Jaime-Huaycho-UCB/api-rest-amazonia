import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {
	constructor(
		@InjectRepository(Departamento)
		private readonly departamentoRepository: Repository<Departamento>
	){}

	async findAll(selectTemplate: FindManyOptions<Departamento>){
		const departamentos = await this.departamentoRepository.find({
			...selectTemplate,
		})
		return departamentos;
	}
}
