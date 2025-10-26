import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadesIndigenasAreasService } from '../services/comunidades-indigenas-areas.service';
import { CreateComunidadesIndigenasAreaDto } from '../dto/create-comunidades-indigenas-area.dto';
import { UpdateComunidadesIndigenasAreaDto } from '../dto/update-comunidades-indigenas-area.dto';

@Controller('comunidades-indigenas-areas')
export class ComunidadesIndigenasAreasController {
  constructor(private readonly comunidadesIndigenasAreasService: ComunidadesIndigenasAreasService) {}

  @Post()
  create(@Body() createComunidadesIndigenasAreaDto: CreateComunidadesIndigenasAreaDto) {
    return this.comunidadesIndigenasAreasService.create(createComunidadesIndigenasAreaDto);
  }

  @Get()
  findAll() {
    return this.comunidadesIndigenasAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesIndigenasAreasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunidadesIndigenasAreaDto: UpdateComunidadesIndigenasAreaDto) {
    return this.comunidadesIndigenasAreasService.update(+id, updateComunidadesIndigenasAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesIndigenasAreasService.remove(+id);
  }
}
