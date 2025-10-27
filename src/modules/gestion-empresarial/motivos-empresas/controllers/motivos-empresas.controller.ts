import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotivosEmpresasService } from '../services/motivos-empresas.service';
import { CreateMotivosEmpresaDto } from '../dto/create-motivos-empresa.dto';
import { UpdateMotivosEmpresaDto } from '../dto/update-motivos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('motivos-empresas')
export class MotivosEmpresasController {
  constructor(private readonly motivosEmpresasService: MotivosEmpresasService) {}

  @Post()
  create(@Body() createMotivosEmpresaDto: CreateMotivosEmpresaDto) {
    return this.motivosEmpresasService.create(createMotivosEmpresaDto);
  }

  @Get()
  findAll() {
    return this.motivosEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motivosEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotivosEmpresaDto: UpdateMotivosEmpresaDto) {
    return this.motivosEmpresasService.update(+id, updateMotivosEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motivosEmpresasService.remove(+id);
  }
}
