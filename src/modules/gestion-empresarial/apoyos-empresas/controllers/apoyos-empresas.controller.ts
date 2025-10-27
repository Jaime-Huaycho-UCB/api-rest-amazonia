import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoyosEmpresasService } from '../services/apoyos-empresas.service';
import { CreateApoyosEmpresaDto } from '../dto/create-apoyos-empresa.dto';
import { UpdateApoyosEmpresaDto } from '../dto/update-apoyos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('apoyos-empresas')
export class ApoyosEmpresasController {
  constructor(private readonly apoyosEmpresasService: ApoyosEmpresasService) {}

  @Post()
  create(@Body() createApoyosEmpresaDto: CreateApoyosEmpresaDto) {
    return this.apoyosEmpresasService.create(createApoyosEmpresaDto);
  }

  @Get()
  findAll() {
    return this.apoyosEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyosEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyosEmpresaDto: UpdateApoyosEmpresaDto) {
    return this.apoyosEmpresasService.update(+id, updateApoyosEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyosEmpresasService.remove(+id);
  }
}
