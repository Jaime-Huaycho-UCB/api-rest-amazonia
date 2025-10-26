import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormasJuridicasService } from '../services/formas-juridicas.service';
import { CreateFormasJuridicaDto } from '../dto/create-formas-juridica.dto';
import { UpdateFormasJuridicaDto } from '../dto/update-formas-juridica.dto';

@Controller('formas-juridicas')
export class FormasJuridicasController {
  constructor(private readonly formasJuridicasService: FormasJuridicasService) {}

  @Post()
  create(@Body() createFormasJuridicaDto: CreateFormasJuridicaDto) {
    return this.formasJuridicasService.create(createFormasJuridicaDto);
  }

  @Get()
  findAll() {
    return this.formasJuridicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formasJuridicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormasJuridicaDto: UpdateFormasJuridicaDto) {
    return this.formasJuridicasService.update(+id, updateFormasJuridicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formasJuridicasService.remove(+id);
  }
}
