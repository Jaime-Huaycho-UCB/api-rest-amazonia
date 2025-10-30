import { Injectable } from '@nestjs/common';
import { CreateOrganizacioneDto } from '../dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from '../dto/update-organizacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from '../entities/organizacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposOrganizacionesService } from 'src/modules/catalogos/tipos-organizaciones/services/tipos-organizaciones.service';
import { DepartamentosService } from 'src/modules/ubicaciones-geograficas/departamentos/services/departamentos.service';

@Injectable()
export class OrganizacionesService {
	constructor(
		@InjectRepository(Organizacion)
		private readonly organizacionRepository: Repository<Organizacion>,
		private readonly tiposOrganizacionesService: TiposOrganizacionesService,
		private readonly departamentosService: DepartamentosService,
	){}

	async create(data: CreateOrganizacioneDto,manager?: EntityManager){
		const repo = manager ? manager.getRepository(Organizacion) : this.organizacionRepository;
		const tipo = await this.tiposOrganizacionesService.findOneOrCreate(data.tipo,manager);
		const departamento = await this.departamentosService.findOne(data.idDepartamento);
		const organizacion = new Organizacion();
		organizacion.nombre = data.nombre;
		organizacion.idDepartamento = departamento.id;
		organizacion.esNacional = data.esNacional;
		organizacion.idTipo = tipo.id;
		organizacion.anioInicioTrabajo = data.anioInicioTrabajo;
		return await repo.save(organizacion);
	}

	async findAll(){
		const organizaciones = await this.organizacionRepository.find({
			relations: {
				tipo: true,
				departamento: true
			}
		})
		return organizaciones;
	}
}

