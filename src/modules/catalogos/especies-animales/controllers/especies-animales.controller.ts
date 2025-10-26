import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspeciesAnimalesService } from '../services/especies-animales.service';
import { CreateEspeciesAnimaleDto } from '../dto/create-especies-animale.dto';
import { UpdateEspeciesAnimaleDto } from '../dto/update-especies-animale.dto';

@Controller('especies-animales')
export class EspeciesAnimalesController {
  constructor(private readonly especiesAnimalesService: EspeciesAnimalesService) {}

  @Post()
  create(@Body() createEspeciesAnimaleDto: CreateEspeciesAnimaleDto) {
    return this.especiesAnimalesService.create(createEspeciesAnimaleDto);
  }

  @Get()
  findAll() {
    return this.especiesAnimalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especiesAnimalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspeciesAnimaleDto: UpdateEspeciesAnimaleDto) {
    return this.especiesAnimalesService.update(+id, updateEspeciesAnimaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especiesAnimalesService.remove(+id);
  }
}
