import { Module } from '@nestjs/common';
import { OdsEmpresasService } from './services/ods-empresas.service';
import { OdsEmpresasController } from './controllers/ods-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdsEmpresa } from './entities/ods-empresa.entity';
import { OdsModule } from 'src/modules/catalogos/ods/ods.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([OdsEmpresa]),
		OdsModule,
	],
	controllers: [OdsEmpresasController],
	providers: [OdsEmpresasService],
	exports: [OdsEmpresasService]
})
export class OdsEmpresasModule { }
