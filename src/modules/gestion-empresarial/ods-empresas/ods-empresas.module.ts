import { Module } from '@nestjs/common';
import { OdsEmpresasService } from './services/ods-empresas.service';
import { OdsEmpresasController } from './controllers/ods-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdsEmpresa } from './entities/ods-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([OdsEmpresa])
	],
	controllers: [OdsEmpresasController],
	providers: [OdsEmpresasService],
})
export class OdsEmpresasModule { }
