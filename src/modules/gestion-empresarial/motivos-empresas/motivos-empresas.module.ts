import { Module } from '@nestjs/common';
import { MotivosEmpresasService } from './services/motivos-empresas.service';
import { MotivosEmpresasController } from './controllers/motivos-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoEmpresa } from './entities/motivo-empresa.entity';
import { MotivosModule } from 'src/modules/catalogos/motivos/motivos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([MotivoEmpresa]),
		MotivosModule,
	],
	controllers: [MotivosEmpresasController],
	providers: [MotivosEmpresasService],
	exports: [MotivosEmpresasService]
})
export class MotivosEmpresasModule { }
