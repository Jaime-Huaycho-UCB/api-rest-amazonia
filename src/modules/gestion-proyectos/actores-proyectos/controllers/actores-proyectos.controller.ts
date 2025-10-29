import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActoresProyectosService } from '../services/actores-proyectos.service';
import { CreateActoresProyectoDto } from '../dto/create-actores-proyecto.dto';
import { UpdateActoresProyectoDto } from '../dto/update-actores-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('actores-proyectos')
export class ActoresProyectosController {
  constructor(private readonly actoresProyectosService: ActoresProyectosService) {}

}
