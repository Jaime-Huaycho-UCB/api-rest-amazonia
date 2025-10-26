import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActoresMunicipalesService } from '../services/actores-municipales.service';
import { CreateActoresMunicipaleDto } from '../dto/create-actores-municipale.dto';
import { UpdateActoresMunicipaleDto } from '../dto/update-actores-municipale.dto';

@Controller('actores-municipales')
export class ActoresMunicipalesController {
  constructor(private readonly actoresMunicipalesService: ActoresMunicipalesService) {}

  @Post()
  create(@Body() createActoresMunicipaleDto: CreateActoresMunicipaleDto) {
    return this.actoresMunicipalesService.create(createActoresMunicipaleDto);
  }

  @Get()
  findAll() {
    return this.actoresMunicipalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actoresMunicipalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActoresMunicipaleDto: UpdateActoresMunicipaleDto) {
    return this.actoresMunicipalesService.update(+id, updateActoresMunicipaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actoresMunicipalesService.remove(+id);
  }
}
