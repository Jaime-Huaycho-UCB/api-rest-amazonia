import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalidadesProyectosService } from '../services/localidades-proyectos.service';
import { CreateLocalidadesProyectoDto } from '../dto/create-localidades-proyecto.dto';
import { UpdateLocalidadesProyectoDto } from '../dto/update-localidades-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('localidades-proyectos')
export class LocalidadesProyectosController {
  constructor(private readonly localidadesProyectosService: LocalidadesProyectosService) {}

}
