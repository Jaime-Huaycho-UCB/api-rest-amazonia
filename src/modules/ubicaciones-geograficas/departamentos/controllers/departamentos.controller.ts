import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DepartamentosService } from '../services/departamentos.service';
import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DepartamentosAllTemplate } from '../find-templates';
import { OkRes } from 'src/shared/utils';
import { FindAllDepartamentosDto } from '../dto/find-all-departamentos.dto';

@ApiTags('Departamentos')
@Controller('departamentos')
export class DepartamentosController {
	constructor(private readonly departamentosService: DepartamentosService) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener los departamentos'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtneer los departamentos',
		type: FindAllDepartamentosDto
	})
	async findAll(
		@Res() res: Response
	){
		const departamentos = await this.departamentosService.findAll(DepartamentosAllTemplate);
		return OkRes(res,{
			departamentos: departamentos
		})
	}
}
