import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConservacionAnimalesService } from '../services/conservacion-animales.service';
import { CreateConservacionAnimaleDto } from '../dto/create-conservacion-animale.dto';
import { UpdateConservacionAnimaleDto } from '../dto/update-conservacion-animale.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('conservacion-animales')
export class ConservacionAnimalesController {
  constructor(private readonly conservacionAnimalesService: ConservacionAnimalesService) {}
}
