import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposProyectosService } from '../services/tipos-proyectos.service';
import { CreateTiposProyectoDto } from '../dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from '../dto/update-tipos-proyecto.dto';

@Controller('tipos-proyectos')
export class TiposProyectosController {
  constructor(private readonly tiposProyectosService: TiposProyectosService) {}

  @Post()
  create(@Body() createTiposProyectoDto: CreateTiposProyectoDto) {
    return this.tiposProyectosService.create(createTiposProyectoDto);
  }

  @Get()
  findAll() {
    return this.tiposProyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposProyectosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposProyectoDto: UpdateTiposProyectoDto) {
    return this.tiposProyectosService.update(+id, updateTiposProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposProyectosService.remove(+id);
  }
}
