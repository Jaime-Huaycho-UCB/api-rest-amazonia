import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConservacionAgricolasService } from '../services/conservacion-agricolas.service';
import { CreateConservacionAgricolaDto } from '../dto/create-conservacion-agricola.dto';
import { UpdateConservacionAgricolaDto } from '../dto/update-conservacion-agricola.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('conservacion-agricolas')
export class ConservacionAgricolasController {
  constructor(private readonly conservacionAgricolasService: ConservacionAgricolasService) {}
}
