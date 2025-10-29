import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';

@Controller('empresas')
export class EmpresasController {
	constructor(private readonly empresasService: EmpresasService) { }

	@Get()
	async create(@Res() res: Response) {
		const empresas = await this.empresasService.findAll();
		return OkRes(res,{
			empresas: empresas
		})
	}
}
