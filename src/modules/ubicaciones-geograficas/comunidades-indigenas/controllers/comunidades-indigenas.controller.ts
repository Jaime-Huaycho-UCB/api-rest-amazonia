import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadesIndigenasService } from '../services/comunidades-indigenas.service';
import { CreateComunidadesIndigenaDto } from '../dto/create-comunidades-indigena.dto';
import { UpdateComunidadesIndigenaDto } from '../dto/update-comunidades-indigena.dto';

@Controller('comunidades-indigenas')
export class ComunidadesIndigenasController {
  constructor(private readonly comunidadesIndigenasService: ComunidadesIndigenasService) {}

  @Post()
  create(@Body() createComunidadesIndigenaDto: CreateComunidadesIndigenaDto) {
    return this.comunidadesIndigenasService.create(createComunidadesIndigenaDto);
  }

  @Get()
  findAll() {
    return this.comunidadesIndigenasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesIndigenasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunidadesIndigenaDto: UpdateComunidadesIndigenaDto) {
    return this.comunidadesIndigenasService.update(+id, updateComunidadesIndigenaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesIndigenasService.remove(+id);
  }
}
