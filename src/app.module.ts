import { Module } from '@nestjs/common';
import { MyConfigModule } from './infrastructure/config/config.module';
import { MyDatabaseModule } from './infrastructure/database/database.module';
import { TiposOrganizacionesModule } from './modules/catalogos/tipos-organizaciones/tipos-organizaciones.module';
import { AreasDesarrolloModule } from './modules/catalogos/areas-desarrollo/areas-desarrollo.module';
import { PracticasAgricolasModule } from './modules/catalogos/practicas-agricolas/practicas-agricolas.module';
import { EspeciesAnimalesModule } from './modules/catalogos/especies-animales/especies-animales.module';
import { AyudasModule } from './modules/catalogos/ayudas/ayudas.module';
import { ActoresMunicipalesModule } from './modules/catalogos/actores-municipales/actores-municipales.module';
import { TiposProyectosModule } from './modules/catalogos/tipos-proyectos/tipos-proyectos.module';
import { AreasModule } from './modules/catalogos/areas/areas.module';
import { MotivosModule } from './modules/catalogos/motivos/motivos.module';
import { ApoyosModule } from './modules/catalogos/apoyos/apoyos.module';
import { OdsModule } from './modules/catalogos/ods/ods.module';
import { FormasJuridicasModule } from './modules/catalogos/formas-juridicas/formas-juridicas.module';
import { DepartamentosModule } from './modules/ubicaciones-geograficas/departamentos/departamentos.module';
import { MunicipiosModule } from './modules/ubicaciones-geograficas/municipios/municipios.module';
import { ComunidadesIndigenasModule } from './modules/ubicaciones-geograficas/comunidades-indigenas/comunidades-indigenas.module';
import { OrganizacionesModule } from './modules/gestion-organizacional/organizaciones/organizaciones.module';
import { OrganizacionesEmpresasModule } from './modules/gestion-organizacional/organizaciones-empresas/organizaciones-empresas.module';
import { EmpresasModule } from './modules/gestion-empresarial/empresas/empresas.module';
import { MotivosEmpresasModule } from './modules/gestion-empresarial/motivos-empresas/motivos-empresas.module';
import { ApoyosEmpresasModule } from './modules/gestion-empresarial/apoyos-empresas/apoyos-empresas.module';
import { OdsEmpresasModule } from './modules/gestion-empresarial/ods-empresas/ods-empresas.module';
import { DepartamentosEmpresasModule } from './modules/gestion-empresarial/departamentos-empresas/departamentos-empresas.module';
import { ProyectosModule } from './modules/gestion-proyectos/proyectos/proyectos.module';
import { ProyectosEmpresasModule } from './modules/gestion-proyectos/proyectos-empresas/proyectos-empresas.module';
import { ProyectosOrganizacionesModule } from './modules/gestion-proyectos/proyectos-organizaciones/proyectos-organizaciones.module';
import { LocalidadesProyectosModule } from './modules/gestion-proyectos/localidades-proyectos/localidades-proyectos.module';
import { ActoresProyectosModule } from './modules/gestion-proyectos/actores-proyectos/actores-proyectos.module';
import { AyudasProyectosModule } from './modules/gestion-proyectos/ayudas-proyectos/ayudas-proyectos.module';
import { ConservacionAnimalesModule } from './modules/gestion-conservacion/conservacion-animales/conservacion-animales.module';
import { ConservacionAgricolasModule } from './modules/gestion-conservacion/conservacion-agricolas/conservacion-agricolas.module';
import { ComunidadesIndigenasAreasModule } from './modules/gestion-comunidades/comunidades-indigenas-areas/comunidades-indigenas-areas.module';
import { ComunidadesMunicipiosModule } from './modules/ubicaciones-geograficas/comunidades-municipios/comunidades-municipios.module';

@Module({
	imports: [
		MyConfigModule,
		MyDatabaseModule,
		TiposOrganizacionesModule,
		AreasDesarrolloModule,
		PracticasAgricolasModule,
		EspeciesAnimalesModule,
		AyudasModule,
		ActoresMunicipalesModule,
		TiposProyectosModule,
		AreasModule,
		MotivosModule,
		ApoyosModule,
		OdsModule,
		FormasJuridicasModule,
		DepartamentosModule,
		MunicipiosModule,
		ComunidadesIndigenasModule,
		OrganizacionesModule,
		OrganizacionesEmpresasModule,
		EmpresasModule,
		MotivosEmpresasModule,
		ApoyosEmpresasModule,
		OdsEmpresasModule,
		DepartamentosEmpresasModule,
		ProyectosModule,
		ProyectosEmpresasModule,
		ProyectosOrganizacionesModule,
		LocalidadesProyectosModule,
		ActoresProyectosModule,
		AyudasProyectosModule,
		ConservacionAnimalesModule,
		ConservacionAgricolasModule,
		ComunidadesIndigenasAreasModule,
		ComunidadesMunicipiosModule,
	],
})
export class AppModule { }
