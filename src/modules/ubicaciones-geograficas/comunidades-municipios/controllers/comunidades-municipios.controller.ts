import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadesMunicipiosService } from '../services/comunidades-municipios.service';
import { CreateComunidadesMunicipioDto } from '../dto/create-comunidades-municipio.dto';
import { UpdateComunidadesMunicipioDto } from '../dto/update-comunidades-municipio.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('comunidades-municipios')
export class ComunidadesMunicipiosController {
  constructor(private readonly comunidadesMunicipiosService: ComunidadesMunicipiosService) {}

  @Post()
  create(@Body() createComunidadesMunicipioDto: CreateComunidadesMunicipioDto) {
    return this.comunidadesMunicipiosService.create(createComunidadesMunicipioDto);
  }

  @Get()
  findAll() {
    return this.comunidadesMunicipiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesMunicipiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunidadesMunicipioDto: UpdateComunidadesMunicipioDto) {
    return this.comunidadesMunicipiosService.update(+id, updateComunidadesMunicipioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesMunicipiosService.remove(+id);
  }
}
