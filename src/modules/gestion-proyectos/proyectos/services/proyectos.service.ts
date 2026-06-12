import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposProyectosService } from 'src/modules/catalogos/tipos-proyectos/services/tipos-proyectos.service';
import { LocalidadesProyectosService } from '../../localidades-proyectos/services/localidades-proyectos.service';
import { AyudasProyectosService } from '../../ayudas-proyectos/services/ayudas-proyectos.service';
import { ActoresProyectosService } from '../../actores-proyectos/services/actores-proyectos.service';
import { ConservacionAnimalesService } from 'src/modules/gestion-conservacion/conservacion-animales/services/conservacion-animales.service';
import { AreasEnum } from 'src/shared/enums/areas.enum';
import { CreateConservacionDto } from '../dto/create-conservacion.dto';
import { CreateComunidadesIndigenasAreaDto } from 'src/modules/gestion-comunidades/comunidades-indigenas-areas/dto/create-comunidades-indigenas-area.dto';
import { MyBadRequestException } from 'src/shared/exceptions';
import { ConservacionAgricolasService } from 'src/modules/gestion-conservacion/conservacion-agricolas/services/conservacion-agricolas.service';
import { ComunidadesIndigenasAreasService } from 'src/modules/gestion-comunidades/comunidades-indigenas-areas/services/comunidades-indigenas-areas.service';

@Injectable()
export class ProyectosService {
	constructor(
		@InjectRepository(Proyecto)
		private readonly proyectoRepository: Repository<Proyecto>,
		private readonly tiposProyectosService: TiposProyectosService,
		private readonly localidadesProyectosService: LocalidadesProyectosService,
		private readonly ayudasProyectosService: AyudasProyectosService,
		private readonly actoresProyectosService: ActoresProyectosService,
		private readonly conservacionAnimalesService: ConservacionAnimalesService,
		private readonly conservacionAgricolasService: ConservacionAgricolasService,
		private readonly comunidadesIndigenasAreasService: ComunidadesIndigenasAreasService
	){}

	async create(data: CreateProyectoDto,manager?: EntityManager){
		const repo = manager ? manager.getRepository(Proyecto) : this.proyectoRepository
		const tipoProyecto = await this.tiposProyectosService.findOneOrCreate(data.tipo,manager)
		const proyecto = new Proyecto();
		proyecto.nombre = data.nombre;
		proyecto.descripcion = data.descripcion;
		proyecto.anioInicio = data.anioInicio;
		if (proyecto.anioFin){
			proyecto.anioFin = data.anioFin;
		}
		proyecto.idArea = data.area;
		proyecto.idTipo = tipoProyecto.id;
		const proyectoSaved = await repo.save(proyecto);
		await this.localidadesProyectosService.createMany(proyecto.id,data.municipiosTrabajo,manager);
		await this.ayudasProyectosService.createMany(proyectoSaved.id,data.ayudas,manager);
		await this.actoresProyectosService.createMany(proyectoSaved.id,data.actores,manager);
		switch (proyectoSaved.idArea) {
			case AreasEnum.conservacion:
				await this.createConservacion(proyectoSaved.id,data.conservacion,manager);
				break;
			case AreasEnum.desarrollo:
				await this.createDesarrollo(proyectoSaved.id,data.desarrollo,manager);
				break;
			default:
				throw new MyBadRequestException('Ingrese una area especifica del proyecto')
				break;
		}
		return proyectoSaved
	}

	async createConservacion(idProyecto:number, data?: CreateConservacionDto,manager?: EntityManager){
		if (!data){
			throw new MyBadRequestException('Si elije un proyecto del area de Conservacion, debe tener este apartado obligatorio')
		}
		await this.conservacionAnimalesService.createMany(idProyecto,data.especies,manager);
		await this.conservacionAgricolasService.createMany(idProyecto,data.practicasAgricolas,manager)
	}
	async createDesarrollo(idProyecto: number, data?: CreateComunidadesIndigenasAreaDto,manager?: EntityManager){
		if (!data){
			throw new MyBadRequestException('Si elije un proyecto del area de Desarrollo, debe tener este apartado obligatorio')
		}
		await this.comunidadesIndigenasAreasService.createMany(idProyecto,data,manager);
	}

	async findAll(params?: { page?: number; limit?: number; area?: number; departamento?: number; tipo?: number; anio?: number; search?: string }) {
		const page = params?.page ?? 1;
		const limit = params?.limit ?? 10;

		const qb = this.proyectoRepository
			.createQueryBuilder('p')
			.leftJoinAndSelect('p.area', 'area')
			.leftJoinAndSelect('p.tipo', 'tipo')
			.leftJoinAndSelect('p.ayudas', 'ayudas')
			.leftJoinAndSelect('p.actoresMunicipales', 'actoresMunicipales')
			.leftJoinAndSelect('p.localidadesProyectos', 'localidades')
			.leftJoinAndSelect('localidades.municipio', 'municipio')
			.leftJoinAndSelect('municipio.departamento', 'departamento')
			.orderBy('p.id', 'ASC');

		if (params?.search) {
			qb.andWhere('p.nombre ILIKE :search', { search: `%${params.search}%` });
		}

		if (params?.area) {
			qb.andWhere('p.idArea = :area', { area: params.area });
		}

		if (params?.tipo) {
			qb.andWhere('p.idTipo = :tipo', { tipo: params.tipo });
		}

		if (params?.anio) {
			qb.andWhere('p.anioInicio = :anio', { anio: params.anio });
		}

		if (params?.departamento) {
			qb.andWhere('departamento.id = :departamento', { departamento: params.departamento });
		}

		const [proyectos, total] = await qb
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount();

		return {
			data: proyectos,
			page,
			limit,
			pages: Math.ceil(total / limit),
			total,
		};
	}
}
