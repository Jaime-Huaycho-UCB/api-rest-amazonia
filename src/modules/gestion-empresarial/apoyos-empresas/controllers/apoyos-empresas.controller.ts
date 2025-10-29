import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoyosEmpresasService } from '../services/apoyos-empresas.service';
import { CreateApoyosEmpresaDto } from '../dto/create-apoyos-empresa.dto';
import { UpdateApoyosEmpresaDto } from '../dto/update-apoyos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('apoyos-empresas')
export class ApoyosEmpresasController {
  constructor(private readonly apoyosEmpresasService: ApoyosEmpresasService) {}

}
