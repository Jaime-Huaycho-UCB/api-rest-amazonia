import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosOrganizacionesService } from '../services/proyectos-organizaciones.service';
import { CreateProyectosOrganizacioneDto } from '../dto/create-proyectos-organizacione.dto';
import { UpdateProyectosOrganizacioneDto } from '../dto/update-proyectos-organizacione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('proyectos-organizaciones')
export class ProyectosOrganizacionesController {
  constructor(private readonly proyectosOrganizacionesService: ProyectosOrganizacionesService) {}
}
