import { Module } from '@nestjs/common';
import { OrganizacionesService } from './services/organizaciones.service';
import { OrganizacionesController } from './controllers/organizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacion } from './entities/organizacion.entity';
import { TiposOrganizacionesModule } from 'src/modules/catalogos/tipos-organizaciones/tipos-organizaciones.module';
import { DepartamentosModule } from 'src/modules/ubicaciones-geograficas/departamentos/departamentos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Organizacion]),
		TiposOrganizacionesModule,
		DepartamentosModule,
	],
	controllers: [OrganizacionesController],
	providers: [OrganizacionesService],
	exports: [OrganizacionesService]
})
export class OrganizacionesModule { }
