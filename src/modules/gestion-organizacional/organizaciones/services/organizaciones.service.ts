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

	async findAll(params?: { page?: number; limit?: number; departamento?: number; esNacional?: boolean; tipo?: number; search?: string }) {
		const page = params?.page ?? 1;
		const limit = params?.limit ?? 10;

		const qb = this.organizacionRepository
			.createQueryBuilder('o')
			.leftJoinAndSelect('o.tipo', 'tipo')
			.leftJoinAndSelect('o.departamento', 'departamento')
			.orderBy('o.id', 'ASC');

		if (params?.search) {
			qb.andWhere('o.nombre ILIKE :search', { search: `%${params.search}%` });
		}

		if (params?.departamento) {
			qb.andWhere('o.idDepartamento = :departamento', { departamento: params.departamento });
		}

		if (params?.esNacional !== undefined) {
			qb.andWhere('o.esNacional = :esNacional', { esNacional: params.esNacional });
		}

		if (params?.tipo) {
			qb.andWhere('o.idTipo = :tipo', { tipo: params.tipo });
		}

		const [organizaciones, total] = await qb
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount();

		return {
			data: organizaciones,
			page,
			limit,
			pages: Math.ceil(total / limit),
			total,
		};
	}
}

