import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadesIndigenasAreasService } from '../services/comunidades-indigenas-areas.service';
import { CreateComunidadesIndigenasAreaDto } from '../dto/create-comunidades-indigenas-area.dto';
import { UpdateComunidadesIndigenasAreaDto } from '../dto/update-comunidades-indigenas-area.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('comunidades-indigenas-areas')
export class ComunidadesIndigenasAreasController {
  constructor(private readonly comunidadesIndigenasAreasService: ComunidadesIndigenasAreasService) {}

}
