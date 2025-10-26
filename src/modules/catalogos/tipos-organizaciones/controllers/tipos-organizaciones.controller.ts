import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposOrganizacionesService } from '../services/tipos-organizaciones.service';
import { CreateTiposOrganizacioneDto } from '../dto/create-tipos-organizacione.dto';
import { UpdateTiposOrganizacioneDto } from '../dto/update-tipos-organizacione.dto';

@Controller('tipos-organizaciones')
export class TiposOrganizacionesController {
  constructor(private readonly tiposOrganizacionesService: TiposOrganizacionesService) {}

  @Post()
  create(@Body() createTiposOrganizacioneDto: CreateTiposOrganizacioneDto) {
    return this.tiposOrganizacionesService.create(createTiposOrganizacioneDto);
  }

  @Get()
  findAll() {
    return this.tiposOrganizacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposOrganizacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposOrganizacioneDto: UpdateTiposOrganizacioneDto) {
    return this.tiposOrganizacionesService.update(+id, updateTiposOrganizacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposOrganizacionesService.remove(+id);
  }
}
