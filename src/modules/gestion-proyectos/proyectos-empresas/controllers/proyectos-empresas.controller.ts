import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosEmpresasService } from '../services/proyectos-empresas.service';
import { CreateProyectosEmpresaDto } from '../dto/create-proyectos-empresa.dto';
import { UpdateProyectosEmpresaDto } from '../dto/update-proyectos-empresa.dto';

@Controller('proyectos-empresas')
export class ProyectosEmpresasController {
  constructor(private readonly proyectosEmpresasService: ProyectosEmpresasService) {}

  @Post()
  create(@Body() createProyectosEmpresaDto: CreateProyectosEmpresaDto) {
    return this.proyectosEmpresasService.create(createProyectosEmpresaDto);
  }

  @Get()
  findAll() {
    return this.proyectosEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectosEmpresaDto: UpdateProyectosEmpresaDto) {
    return this.proyectosEmpresasService.update(+id, updateProyectosEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectosEmpresasService.remove(+id);
  }
}
