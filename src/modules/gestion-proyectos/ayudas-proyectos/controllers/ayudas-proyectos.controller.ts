import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AyudasProyectosService } from '../services/ayudas-proyectos.service';
import { CreateAyudasProyectoDto } from '../dto/create-ayudas-proyecto.dto';
import { UpdateAyudasProyectoDto } from '../dto/update-ayudas-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('ayudas-proyectos')
export class AyudasProyectosController {
  constructor(private readonly ayudasProyectosService: AyudasProyectosService) {}
}
