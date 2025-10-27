import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentosEmpresasService } from '../services/departamentos-empresas.service';
import { CreateDepartamentosEmpresaDto } from '../dto/create-departamentos-empresa.dto';
import { UpdateDepartamentosEmpresaDto } from '../dto/update-departamentos-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('departamentos-empresas')
export class DepartamentosEmpresasController {
  constructor(private readonly departamentosEmpresasService: DepartamentosEmpresasService) {}

  @Post()
  create(@Body() createDepartamentosEmpresaDto: CreateDepartamentosEmpresaDto) {
    return this.departamentosEmpresasService.create(createDepartamentosEmpresaDto);
  }

  @Get()
  findAll() {
    return this.departamentosEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentosEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartamentosEmpresaDto: UpdateDepartamentosEmpresaDto) {
    return this.departamentosEmpresasService.update(+id, updateDepartamentosEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentosEmpresasService.remove(+id);
  }
}
