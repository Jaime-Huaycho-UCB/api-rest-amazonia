import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosOrganizacionesService } from '../services/proyectos-organizaciones.service';
import { CreateProyectosOrganizacioneDto } from '../dto/create-proyectos-organizacione.dto';
import { UpdateProyectosOrganizacioneDto } from '../dto/update-proyectos-organizacione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('proyectos-organizaciones')
export class ProyectosOrganizacionesController {
  constructor(private readonly proyectosOrganizacionesService: ProyectosOrganizacionesService) {}

  @Post()
  create(@Body() createProyectosOrganizacioneDto: CreateProyectosOrganizacioneDto) {
    return this.proyectosOrganizacionesService.create(createProyectosOrganizacioneDto);
  }

  @Get()
  findAll() {
    return this.proyectosOrganizacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosOrganizacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectosOrganizacioneDto: UpdateProyectosOrganizacioneDto) {
    return this.proyectosOrganizacionesService.update(+id, updateProyectosOrganizacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectosOrganizacionesService.remove(+id);
  }
}
