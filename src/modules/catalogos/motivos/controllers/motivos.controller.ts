import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivosService } from '../services/motivos.service';
import { CreateMotivoDto } from '../dto/create-motivo.dto';
import { UpdateMotivoDto } from '../dto/update-motivo.dto';

@Controller('motivos')
export class MotivosController {
  constructor(private readonly motivosService: MotivosService) {}

  @Post()
  create(@Body() createMotivoDto: CreateMotivoDto) {
    return this.motivosService.create(createMotivoDto);
  }

  @Get()
  findAll() {
    return this.motivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotivoDto: UpdateMotivoDto) {
    return this.motivosService.update(+id, updateMotivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motivosService.remove(+id);
  }
}
