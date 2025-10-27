import { Injectable } from '@nestjs/common';
import { CreateAyudaDto } from '../dto/create-ayuda.dto';
import { UpdateAyudaDto } from '../dto/update-ayuda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ayuda } from '../entities/ayuda.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class AyudasService {
	constructor(
		@InjectRepository(Ayuda)
		private readonly ayudaRepository: Repository<Ayuda>
	){}

	async findAll(selectTemplate: FindManyOptions<Ayuda>){
		const ayuda = await this.ayudaRepository.find({
			...selectTemplate
		})
		return ayuda;
	}
}
