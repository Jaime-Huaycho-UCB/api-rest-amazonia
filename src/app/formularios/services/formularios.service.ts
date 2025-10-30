import { Injectable } from '@nestjs/common';
import { EmpresasService } from 'src/modules/gestion-empresarial/empresas/services/empresas.service';
import { DataSource } from 'typeorm';
import { RegisterFormularioEmpresaDto } from '../dto/empresas/register-formulario-empresa.dto';
import { ProyectosEmpresasService } from 'src/modules/gestion-proyectos/proyectos-empresas/services/proyectos-empresas.service';
import { RegisterFormularioOrganizacionDto } from '../dto/organizaciones/register-formulario-organizacion.dto';
import { OrganizacionesService } from 'src/modules/gestion-organizacional/organizaciones/services/organizaciones.service';
import { ProyectosOrganizacionesService } from 'src/modules/gestion-proyectos/proyectos-organizaciones/services/proyectos-organizaciones.service';

@Injectable()
export class FormulariosService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly empresasService: EmpresasService,
        private readonly proyectosEmpresasService: ProyectosEmpresasService,
        private readonly organizacionesService: OrganizacionesService,
        private readonly proyectosOrganizacionesServices: ProyectosOrganizacionesService,
    ){}

    async registerEmpresa(data: RegisterFormularioEmpresaDto){
        return this.dataSource.transaction(async (manager) => {
            const empresa = await this.empresasService.create(data,manager);
            if (data.proyectos){
                const proyectosEmpresas = await this.proyectosEmpresasService.createMany(empresa.id,data.proyectos,manager)
            }
            return empresa;
        })
    }

    async registerOrganizacion(data: RegisterFormularioOrganizacionDto){
        return this.dataSource.transaction(async (manager) => {
            const organizacion = await this.organizacionesService.create(data,manager);
            if (data.proyectos){
                const proyectosEmpresas = await this.proyectosOrganizacionesServices.createMany(organizacion.id,data.proyectos,manager)
            }
            return organizacion;
        })
    }
}
