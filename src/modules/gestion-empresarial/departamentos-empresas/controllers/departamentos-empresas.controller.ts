import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentosEmpresasService } from '../services/departamentos-empresas.service';
import { CreateDepartamentosEmpresaDto } from '../dto/create-departamentos-empresa.dto';
import { UpdateDepartamentosEmpresaDto } from '../dto/update-departamentos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('departamentos-empresas')
export class DepartamentosEmpresasController {
  constructor(private readonly departamentosEmpresasService: DepartamentosEmpresasService) {}

}
