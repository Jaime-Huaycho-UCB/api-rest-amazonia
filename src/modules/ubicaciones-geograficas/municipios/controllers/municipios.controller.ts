import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MunicipiosService } from '../services/municipios.service';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('municipios')
@ApiExcludeController(true)
export class MunicipiosController {
	constructor(private readonly municipiosService: MunicipiosService) { }

}
