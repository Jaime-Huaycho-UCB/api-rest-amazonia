import { Injectable } from '@nestjs/common';
import { CreateTiposOrganizacioneDto } from '../dto/create-tipos-organizacione.dto';
import { UpdateTiposOrganizacioneDto } from '../dto/update-tipos-organizacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoOrganizacion } from '../entities/tipo-organizacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposOrganizacionesService {
	constructor(
		@InjectRepository(TipoOrganizacion)
		private readonly tipoOrganizacionRepository: Repository<TipoOrganizacion> 
	){}

	async findAll(selectTemplate){
		const tiposOrganizaciones = await this.tipoOrganizacionRepository.find({
			...selectTemplate
		})
		return tiposOrganizaciones;
	}
}
