import { Injectable } from '@nestjs/common';
import { CreateApoyoDto } from '../dto/inputs/create-apoyo.dto';
import { UpdateApoyoDto } from '../dto/inputs/update-apoyo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apoyo } from '../entities/apoyo.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Ayuda } from '../../ayudas/entities/ayuda.entity';

@Injectable()
export class ApoyosService {
	constructor(
		@InjectRepository(Apoyo)
		private readonly apoyoRepository: Repository<Apoyo>
	){} 

	async findAll(){
		const apoyo = await this.apoyoRepository.find({
			select: {
				id: true,
				nombre: true,
			},
			where: {
				esPropio: false
			}
		})
		return apoyo;
	}
}
