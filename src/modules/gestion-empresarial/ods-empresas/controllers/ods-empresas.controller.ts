import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OdsEmpresasService } from '../services/ods-empresas.service';
import { CreateOdsEmpresaDto } from '../dto/create-ods-empresa.dto';
import { UpdateOdsEmpresaDto } from '../dto/update-ods-empresa.dto';

@Controller('ods-empresas')
export class OdsEmpresasController {
  constructor(private readonly odsEmpresasService: OdsEmpresasService) {}

  @Post()
  create(@Body() createOdsEmpresaDto: CreateOdsEmpresaDto) {
    return this.odsEmpresasService.create(createOdsEmpresaDto);
  }

  @Get()
  findAll() {
    return this.odsEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odsEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdsEmpresaDto: UpdateOdsEmpresaDto) {
    return this.odsEmpresasService.update(+id, updateOdsEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odsEmpresasService.remove(+id);
  }
}
