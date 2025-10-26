import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoyosService } from '../service/apoyos.service';
import { CreateApoyoDto } from '../dto/create-apoyo.dto';
import { UpdateApoyoDto } from '../dto/update-apoyo.dto';

@Controller('apoyos')
export class ApoyosController {
  constructor(private readonly apoyosService: ApoyosService) {}

  @Post()
  create(@Body() createApoyoDto: CreateApoyoDto) {
    return this.apoyosService.create(createApoyoDto);
  }

  @Get()
  findAll() {
    return this.apoyosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoyosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoyoDto: UpdateApoyoDto) {
    return this.apoyosService.update(+id, updateApoyoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoyosService.remove(+id);
  }
}
