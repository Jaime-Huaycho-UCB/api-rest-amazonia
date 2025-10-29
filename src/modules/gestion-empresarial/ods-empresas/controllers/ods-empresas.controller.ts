import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OdsEmpresasService } from '../services/ods-empresas.service';
import { CreateOdsEmpresaDto } from '../dto/create-ods-empresa.dto';
import { UpdateOdsEmpresaDto } from '../dto/update-ods-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('ods-empresas')
export class OdsEmpresasController {
  constructor(private readonly odsEmpresasService: OdsEmpresasService) {}

}
