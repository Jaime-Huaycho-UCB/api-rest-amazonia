import { Injectable } from '@nestjs/common';
import { CreateFormasJuridicaDto } from '../dto/inputs/create-formas-juridica.dto';
import { UpdateFormasJuridicaDto } from '../dto/inputs/update-formas-juridica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaJuridica } from '../entities/forma-juridica.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { FormaJuridicaFormsDto } from '../dto/forma-juridica-forms.dto';

@Injectable()
export class FormasJuridicasService {
	constructor(
		@InjectRepository(FormaJuridica)
		private readonly formaJuridicaRepository: Repository<FormaJuridica>
	) { }

	create(createFormasJuridicaDto: CreateFormasJuridicaDto) {
		return 'This action adds a new formasJuridica';
	}

	async findAll(templateSelect: FindManyOptions<FormaJuridica>) {
		const formasJuridicas = await this.formaJuridicaRepository.find({
			...templateSelect,
		})
		return formasJuridicas;
	}
}
