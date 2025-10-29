import { Module } from '@nestjs/common';
import { FormulariosService } from './services/formularios.service';
import { FormulariosController } from './controllers/formularios.controller';
import { EmpresasModule } from 'src/modules/gestion-empresarial/empresas/empresas.module';
import { ProyectosEmpresasModule } from 'src/modules/gestion-proyectos/proyectos-empresas/proyectos-empresas.module';

@Module({
	imports: [
		EmpresasModule,
		ProyectosEmpresasModule,
	],
	controllers: [FormulariosController],
	providers: [FormulariosService],
})
export class FormulariosModule { }
