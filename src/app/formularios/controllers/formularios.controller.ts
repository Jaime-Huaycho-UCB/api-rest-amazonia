import { Body, Controller, Post, Res } from '@nestjs/common';
import { FormulariosService } from '../services/formularios.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterFormularioEmpresaDto } from '../dto/empresas/register-formulario-empresa.dto';
import { RegisterFormularioOrganizacionDto } from '../dto/organizaciones/register-formulario-organizacion.dto';
import { Response } from 'express';
import { CreatedRes } from 'src/shared/utils';

@ApiTags('Formularios')
@Controller('formularios')
export class FormulariosController {
	constructor(private readonly formulariosService: FormulariosService) { }

	@Post('empresas')
	@ApiOperation({
		summary: 'Api para registrar formulario de empresas'
	})
	async registerEmpresa(
		@Body() data: RegisterFormularioEmpresaDto,
		@Res() res: Response
	) {
		const formmulario = await this.formulariosService.registerEmpresa(data);
		return CreatedRes(res,{
			message: 'Se lleno el formulario exitosamente'
		})
	}

	@Post('organizaciones')
	@ApiOperation({
		summary: 'Api para registrar formulario de organizaciones'
	})
	async registerOrganizacion(
		@Body() data: RegisterFormularioOrganizacionDto,
		@Res() res: Response
	) {
		
	}
}
