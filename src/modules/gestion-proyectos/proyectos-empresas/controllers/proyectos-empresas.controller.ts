import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosEmpresasService } from '../services/proyectos-empresas.service';
import { CreateProyectosEmpresaDto } from '../dto/create-proyectos-empresa.dto';
import { UpdateProyectosEmpresaDto } from '../dto/update-proyectos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('proyectos-empresas')
export class ProyectosEmpresasController {
  constructor(private readonly proyectosEmpresasService: ProyectosEmpresasService) {}
}
