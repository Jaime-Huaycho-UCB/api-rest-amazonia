import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActoresProyectosService } from '../services/actores-proyectos.service';
import { CreateActoresProyectoDto } from '../dto/create-actores-proyecto.dto';
import { UpdateActoresProyectoDto } from '../dto/update-actores-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('actores-proyectos')
export class ActoresProyectosController {
  constructor(private readonly actoresProyectosService: ActoresProyectosService) {}

  @Post()
  create(@Body() createActoresProyectoDto: CreateActoresProyectoDto) {
    return this.actoresProyectosService.create(createActoresProyectoDto);
  }

  @Get()
  findAll() {
    return this.actoresProyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actoresProyectosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActoresProyectoDto: UpdateActoresProyectoDto) {
    return this.actoresProyectosService.update(+id, updateActoresProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actoresProyectosService.remove(+id);
  }
}
