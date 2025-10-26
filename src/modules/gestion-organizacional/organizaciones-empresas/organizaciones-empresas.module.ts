import { Module } from '@nestjs/common';
import { OrganizacionesEmpresasService } from './services/organizaciones-empresas.service';
import { OrganizacionesEmpresasController } from './controllers/organizaciones-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionEmpresa } from './entities/organizacion-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([OrganizacionEmpresa])
	],
	controllers: [OrganizacionesEmpresasController],
	providers: [OrganizacionesEmpresasService],
})
export class OrganizacionesEmpresasModule { }
