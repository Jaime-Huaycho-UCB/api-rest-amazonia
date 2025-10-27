import { Injectable } from '@nestjs/common';
import { CreateOdDto } from '../dto/create-od.dto';
import { UpdateOdDto } from '../dto/update-od.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ods } from '../entities/ods.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OdsService {
	constructor(
		@InjectRepository(Ods)
		private readonly odsRepository: Repository<Ods>
	){}

	async findAll(){
		const ods = await this.odsRepository.find({
			select: {
				id: true,
				nombre: true,
			}
		})
		return ods;
	}
}
