import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEmpresa } from '../entities/proyecto-empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProyectosService } from '../../proyectos/services/proyectos.service';
import { CreateProyectoDto } from '../../proyectos/dto/create-proyecto.dto';
import { parse } from 'date-fns';

@Injectable()
export class ProyectosEmpresasService {
	constructor(
		@InjectRepository(ProyectoEmpresa)
		private readonly proyectoEmpresaRepository: Repository<ProyectoEmpresa>,
		private readonly proyectosService: ProyectosService,
	) { }

	async createMany(idEmpresa: number, proyectos: CreateProyectoDto[], manager: EntityManager) {
		const repo = manager ? manager.getRepository(ProyectoEmpresa) : this.proyectoEmpresaRepository;

		const proyectosSaved: ProyectoEmpresa[] = await Promise.all(
			proyectos.map(async (p) => {
				const proyectoSaved = await this.proyectosService.create(p, manager);

				const fechaInicioDate = parse(p.fechaInicio, 'dd-MM-yyyy', new Date());
				const fechaFinDate = p.fechaFin ? parse(p.fechaFin, 'dd-MM-yyyy', new Date()) : undefined;

				return {
					idEmpresa: idEmpresa,
					idProyecto: proyectoSaved.id,
					fechaInicio: fechaInicioDate,
					fechaFin: fechaFinDate
				} as ProyectoEmpresa;
			})
		);
		return await repo.save(proyectosSaved);
	}
}
