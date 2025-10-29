import { Injectable } from '@nestjs/common';
import { EmpresasService } from 'src/modules/gestion-empresarial/empresas/services/empresas.service';
import { DataSource } from 'typeorm';
import { RegisterFormularioEmpresaDto } from '../dto/empresas/register-formulario-empresa.dto';
import { ProyectosEmpresasService } from 'src/modules/gestion-proyectos/proyectos-empresas/services/proyectos-empresas.service';

@Injectable()
export class FormulariosService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly empresasService: EmpresasService,
        private readonly proyectosEmpresasService: ProyectosEmpresasService
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
}
