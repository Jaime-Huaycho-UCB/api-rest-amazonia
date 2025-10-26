import { Module } from '@nestjs/common';
import { ApoyosEmpresasService } from './services/apoyos-empresas.service';
import { ApoyosEmpresasController } from './controllers/apoyos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApoyoEmpresa } from './entities/apoyo-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ApoyoEmpresa])
	],
	controllers: [ApoyosEmpresasController],
	providers: [ApoyosEmpresasService],
})
export class ApoyosEmpresasModule { }
