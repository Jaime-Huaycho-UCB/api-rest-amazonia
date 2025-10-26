import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreasDesarrolloService } from '../services/areas-desarrollo.service';
import { CreateAreasDesarrolloDto } from '../dto/create-areas-desarrollo.dto';
import { UpdateAreasDesarrolloDto } from '../dto/update-areas-desarrollo.dto';

@Controller('areas-desarrollo')
export class AreasDesarrolloController {
  constructor(private readonly areasDesarrolloService: AreasDesarrolloService) {}

  @Post()
  create(@Body() createAreasDesarrolloDto: CreateAreasDesarrolloDto) {
    return this.areasDesarrolloService.create(createAreasDesarrolloDto);
  }

  @Get()
  findAll() {
    return this.areasDesarrolloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasDesarrolloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreasDesarrolloDto: UpdateAreasDesarrolloDto) {
    return this.areasDesarrolloService.update(+id, updateAreasDesarrolloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasDesarrolloService.remove(+id);
  }
}
