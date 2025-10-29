import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProyectosService } from '../services/proyectos.service';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';

@ApiTags('Proyectos')
@Controller('proyectos')
export class ProyectosController {
	constructor(
		private readonly proyectosService: ProyectosService
	) { }

	@Get()
	async findAll(@Res() res: Response){
		const proyectos = await this.proyectosService.findAll();
		return OkRes(res,{
			proyectos: proyectos
		})
	}
}
