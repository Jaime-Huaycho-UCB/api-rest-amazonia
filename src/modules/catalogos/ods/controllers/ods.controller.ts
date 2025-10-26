import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OdsService } from '../services/ods.service';
import { CreateOdDto } from '../dto/create-od.dto';
import { UpdateOdDto } from '../dto/update-od.dto';

@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Post()
  create(@Body() createOdDto: CreateOdDto) {
    return this.odsService.create(createOdDto);
  }

  @Get()
  findAll() {
    return this.odsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdDto: UpdateOdDto) {
    return this.odsService.update(+id, updateOdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odsService.remove(+id);
  }
}
