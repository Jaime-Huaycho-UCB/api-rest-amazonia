import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConservacionAgricolasService } from '../services/conservacion-agricolas.service';
import { CreateConservacionAgricolaDto } from '../dto/create-conservacion-agricola.dto';
import { UpdateConservacionAgricolaDto } from '../dto/update-conservacion-agricola.dto';

@Controller('conservacion-agricolas')
export class ConservacionAgricolasController {
  constructor(private readonly conservacionAgricolasService: ConservacionAgricolasService) {}

  @Post()
  create(@Body() createConservacionAgricolaDto: CreateConservacionAgricolaDto) {
    return this.conservacionAgricolasService.create(createConservacionAgricolaDto);
  }

  @Get()
  findAll() {
    return this.conservacionAgricolasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conservacionAgricolasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConservacionAgricolaDto: UpdateConservacionAgricolaDto) {
    return this.conservacionAgricolasService.update(+id, updateConservacionAgricolaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conservacionAgricolasService.remove(+id);
  }
}
