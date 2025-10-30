import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { OrganizacionesService } from '../services/organizaciones.service';
import { CreateOrganizacioneDto } from '../dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from '../dto/update-organizacione.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';

@ApiTags('Organizaciones')
@Controller('organizaciones')
export class OrganizacionesController {
	constructor(private readonly organizacionesService: OrganizacionesService) { }

	@Get()
	async findAll(@Res() res: Response){
		const organizaciones = await this.organizacionesService.findAll();
		return OkRes(res,{
			organizaciones: organizaciones
		})
	}
}
