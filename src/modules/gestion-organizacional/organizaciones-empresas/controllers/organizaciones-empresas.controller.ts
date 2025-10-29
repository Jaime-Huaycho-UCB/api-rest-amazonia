import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionesEmpresasService } from '../services/organizaciones-empresas.service';
import { CreateOrganizacionesEmpresaDto } from '../dto/create-organizaciones-empresa.dto';
import { UpdateOrganizacionesEmpresaDto } from '../dto/update-organizaciones-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('organizaciones-empresas')
export class OrganizacionesEmpresasController {
  constructor(private readonly organizacionesEmpresasService: OrganizacionesEmpresasService) {}

}
