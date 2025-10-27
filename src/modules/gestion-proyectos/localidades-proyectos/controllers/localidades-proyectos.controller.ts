import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalidadesProyectosService } from '../services/localidades-proyectos.service';
import { CreateLocalidadesProyectoDto } from '../dto/create-localidades-proyecto.dto';
import { UpdateLocalidadesProyectoDto } from '../dto/update-localidades-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('localidades-proyectos')
export class LocalidadesProyectosController {
  constructor(private readonly localidadesProyectosService: LocalidadesProyectosService) {}

  @Post()
  create(@Body() createLocalidadesProyectoDto: CreateLocalidadesProyectoDto) {
    return this.localidadesProyectosService.create(createLocalidadesProyectoDto);
  }

  @Get()
  findAll() {
    return this.localidadesProyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localidadesProyectosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalidadesProyectoDto: UpdateLocalidadesProyectoDto) {
    return this.localidadesProyectosService.update(+id, updateLocalidadesProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localidadesProyectosService.remove(+id);
  }
}
