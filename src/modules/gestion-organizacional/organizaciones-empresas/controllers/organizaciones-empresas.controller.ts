import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionesEmpresasService } from '../services/organizaciones-empresas.service';
import { CreateOrganizacionesEmpresaDto } from '../dto/create-organizaciones-empresa.dto';
import { UpdateOrganizacionesEmpresaDto } from '../dto/update-organizaciones-empresa.dto';

@Controller('organizaciones-empresas')
export class OrganizacionesEmpresasController {
  constructor(private readonly organizacionesEmpresasService: OrganizacionesEmpresasService) {}

  @Post()
  create(@Body() createOrganizacionesEmpresaDto: CreateOrganizacionesEmpresaDto) {
    return this.organizacionesEmpresasService.create(createOrganizacionesEmpresaDto);
  }

  @Get()
  findAll() {
    return this.organizacionesEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionesEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionesEmpresaDto: UpdateOrganizacionesEmpresaDto) {
    return this.organizacionesEmpresasService.update(+id, updateOrganizacionesEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionesEmpresasService.remove(+id);
  }
}
