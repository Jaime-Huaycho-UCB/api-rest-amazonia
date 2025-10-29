import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento.entity';
import { FindManyOptions, In, Repository } from 'typeorm';
import { MyBadRequestException } from 'src/shared/exceptions';

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

	async findAllByIds(ids: number[]){
		const departamentos = await this.departamentoRepository.find({
			where: {
				id: In(ids)
			}
		})
		if (departamentos.length !== ids.length){
			throw new MyBadRequestException(`Solo se puede ingresar IDs de departmentos validos`);
		}
		return departamentos;
	}

}
