import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from '../dto/create-empresa.dto';
import { UpdateEmpresaDto } from '../dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { FormasJuridicasService } from 'src/modules/catalogos/formas-juridicas/services/formas-juridicas.service';
import { DepartamentosEmpresasService } from '../../departamentos-empresas/services/departamentos-empresas.service';
import { ApoyosEmpresasService } from '../../apoyos-empresas/services/apoyos-empresas.service';
import { OrganizacionesEmpresasService } from 'src/modules/gestion-organizacional/organizaciones-empresas/services/organizaciones-empresas.service';
import { MotivosEmpresasService } from '../../motivos-empresas/services/motivos-empresas.service';
import { OdsEmpresasService } from '../../ods-empresas/services/ods-empresas.service';

@Injectable()
export class EmpresasService {
	constructor(
		@InjectRepository(Empresa)
		private readonly empresaRepository: Repository<Empresa>,
		private readonly formasJuridicasService: FormasJuridicasService,
		private readonly departamentosEmpresasService: DepartamentosEmpresasService,
		private readonly apoyosEmpresasService: ApoyosEmpresasService,
		private readonly organizacionesEmpresasService: OrganizacionesEmpresasService,
		private readonly motivosEmpresasService: MotivosEmpresasService,
		private readonly odsEmpresasService: OdsEmpresasService
	){}

	async create(data: CreateEmpresaDto,manager?: EntityManager) {
		const repo = manager ? manager.getRepository(Empresa) : this.empresaRepository;
		const formaJuridica = await this.formasJuridicasService.findOneOrCreate(data.formaJuridica,manager)
		const empresa = new Empresa();
		empresa.nombre = data.nombre;
		empresa.idFormaJuridica = formaJuridica.id;
		empresa.anioInicioApoyo = data.anioInicioApoyo;
		const empresaSaved = await repo.save(empresa);

		await this.departamentosEmpresasService.create(empresaSaved.id,data.departamentos,manager);
		await this.apoyosEmpresasService.create(empresaSaved.id,data.apoyos,manager)
		if (data.organizaciones){
			await this.organizacionesEmpresasService.create(empresaSaved.id,data.organizaciones,manager);
		}
		await this.motivosEmpresasService.create(empresaSaved.id,data.motivosApoyo,manager);
		await this.odsEmpresasService.create(empresaSaved.id,data.ods,manager);

		return empresaSaved;
	}

	async findAll(params?: { page?: number; limit?: number; departamento?: number; search?: string }) {
		const page = params?.page ?? 1;
		const limit = params?.limit ?? 10;

		const qb = this.empresaRepository
			.createQueryBuilder('e')
			.leftJoinAndSelect('e.formaJuridica', 'formaJuridica')
			.leftJoinAndSelect('e.departamentos', 'departamentos')
			.leftJoinAndSelect('e.apoyos', 'apoyos')
			.leftJoinAndSelect('e.motivos', 'motivos')
			.leftJoinAndSelect('e.ods', 'ods')
			.leftJoinAndSelect('e.organizacionesEmpresas', 'organizacionesEmpresas')
			.orderBy('e.id', 'ASC');

		if (params?.search) {
			qb.andWhere('e.nombre ILIKE :search', { search: `%${params.search}%` });
		}

		if (params?.departamento) {
			qb.andWhere('departamentos.id = :departamento', { departamento: params.departamento });
		}

		const [empresas, total] = await qb
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount();

		return {
			data: empresas,
			page,
			limit,
			pages: Math.ceil(total / limit),
			total,
		};
	}
}
