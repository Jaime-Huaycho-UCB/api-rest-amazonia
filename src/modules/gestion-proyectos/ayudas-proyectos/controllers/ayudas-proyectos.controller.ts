import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AyudasProyectosService } from '../services/ayudas-proyectos.service';
import { CreateAyudasProyectoDto } from '../dto/create-ayudas-proyecto.dto';
import { UpdateAyudasProyectoDto } from '../dto/update-ayudas-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('ayudas-proyectos')
export class AyudasProyectosController {
  constructor(private readonly ayudasProyectosService: AyudasProyectosService) {}

  @Post()
  create(@Body() createAyudasProyectoDto: CreateAyudasProyectoDto) {
    return this.ayudasProyectosService.create(createAyudasProyectoDto);
  }

  @Get()
  findAll() {
    return this.ayudasProyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ayudasProyectosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAyudasProyectoDto: UpdateAyudasProyectoDto) {
    return this.ayudasProyectosService.update(+id, updateAyudasProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ayudasProyectosService.remove(+id);
  }
}
