import { Module } from '@nestjs/common';
import { MotivosEmpresasService } from './services/motivos-empresas.service';
import { MotivosEmpresasController } from './controllers/motivos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoEmpresa } from './entities/motivo-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([MotivoEmpresa])
	],
	controllers: [MotivosEmpresasController],
	providers: [MotivosEmpresasService],
})
export class MotivosEmpresasModule { }
