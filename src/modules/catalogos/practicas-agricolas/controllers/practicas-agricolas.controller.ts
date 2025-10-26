import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PracticasAgricolasService } from '../services/practicas-agricolas.service';
import { CreatePracticasAgricolaDto } from '../dto/create-practicas-agricola.dto';
import { UpdatePracticasAgricolaDto } from '../dto/update-practicas-agricola.dto';

@Controller('practicas-agricolas')
export class PracticasAgricolasController {
  constructor(private readonly practicasAgricolasService: PracticasAgricolasService) {}

  @Post()
  create(@Body() createPracticasAgricolaDto: CreatePracticasAgricolaDto) {
    return this.practicasAgricolasService.create(createPracticasAgricolaDto);
  }

  @Get()
  findAll() {
    return this.practicasAgricolasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practicasAgricolasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePracticasAgricolaDto: UpdatePracticasAgricolaDto) {
    return this.practicasAgricolasService.update(+id, updatePracticasAgricolaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicasAgricolasService.remove(+id);
  }
}
