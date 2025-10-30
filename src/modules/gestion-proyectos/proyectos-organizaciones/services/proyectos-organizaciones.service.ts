import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoOrganizacion } from '../entities/proyecto-organizacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateProyectoDto } from '../../proyectos/dto/create-proyecto.dto';
import { ProyectosService } from '../../proyectos/services/proyectos.service';
import { parse } from 'date-fns';

@Injectable()
export class ProyectosOrganizacionesService {
	constructor(
		@InjectRepository(ProyectoOrganizacion)
		private readonly proyectoOrganizacionRepository: Repository<ProyectoOrganizacion>,
		private readonly proyectosService: ProyectosService,
	) { }

	async createMany(idOrganizacion: number, proyectos: CreateProyectoDto[], manager: EntityManager) {
		const repo = manager ? manager.getRepository(ProyectoOrganizacion) : this.proyectoOrganizacionRepository;

		const proyectosSaved: ProyectoOrganizacion[] = await Promise.all(
			proyectos.map(async (p) => {
				const proyectoSaved = await this.proyectosService.create(p, manager);

				const fechaInicioDate = parse(p.fechaInicio, 'dd-MM-yyyy', new Date());
				const fechaFinDate = p.fechaFin ? parse(p.fechaFin, 'dd-MM-yyyy', new Date()) : undefined;

				return {
					idOrganizacion: idOrganizacion,
					idProyecto: proyectoSaved.id,
					fechaInicio: fechaInicioDate,
					fechaFin: fechaFinDate
				} as ProyectoOrganizacion;
			})
		);
		return await repo.save(proyectosSaved);
	}
}
