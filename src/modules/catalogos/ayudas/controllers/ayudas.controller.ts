import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AyudasService } from '../services/ayudas.service';
import { CreateAyudaDto } from '../dto/create-ayuda.dto';
import { UpdateAyudaDto } from '../dto/update-ayuda.dto';

@Controller('ayudas')
export class AyudasController {
  constructor(private readonly ayudasService: AyudasService) {}

  @Post()
  create(@Body() createAyudaDto: CreateAyudaDto) {
    return this.ayudasService.create(createAyudaDto);
  }

  @Get()
  findAll() {
    return this.ayudasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ayudasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAyudaDto: UpdateAyudaDto) {
    return this.ayudasService.update(+id, updateAyudaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ayudasService.remove(+id);
  }
}
