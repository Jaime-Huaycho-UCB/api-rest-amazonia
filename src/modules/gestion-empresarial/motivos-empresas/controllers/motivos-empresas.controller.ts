import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivosEmpresasService } from '../services/motivos-empresas.service';
import { CreateMotivosEmpresaDto } from '../dto/create-motivos-empresa.dto';
import { UpdateMotivosEmpresaDto } from '../dto/update-motivos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('motivos-empresas')
export class MotivosEmpresasController {
  constructor(private readonly motivosEmpresasService: MotivosEmpresasService) {}
}
