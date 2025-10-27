import { Injectable } from '@nestjs/common';
import { CreateMotivoDto } from '../dto/inputs/create-motivo.dto';
import { UpdateMotivoDto } from '../dto/inputs/update-motivo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Motivo } from '../entities/motivo.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class MotivosService {
	constructor(
		@InjectRepository(Motivo)
		private readonly motivoRepository: Repository<Motivo>
	){}

	async findAll(selectTemplate: FindManyOptions<Motivo>): Promise<Motivo[]>{
		const motivos = await this.motivoRepository.find({
			...selectTemplate
		})
		return motivos
	}
}
