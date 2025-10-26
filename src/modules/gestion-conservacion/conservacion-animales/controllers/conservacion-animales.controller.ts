import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConservacionAnimalesService } from '../services/conservacion-animales.service';
import { CreateConservacionAnimaleDto } from '../dto/create-conservacion-animale.dto';
import { UpdateConservacionAnimaleDto } from '../dto/update-conservacion-animale.dto';

@Controller('conservacion-animales')
export class ConservacionAnimalesController {
  constructor(private readonly conservacionAnimalesService: ConservacionAnimalesService) {}

  @Post()
  create(@Body() createConservacionAnimaleDto: CreateConservacionAnimaleDto) {
    return this.conservacionAnimalesService.create(createConservacionAnimaleDto);
  }

  @Get()
  findAll() {
    return this.conservacionAnimalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conservacionAnimalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConservacionAnimaleDto: UpdateConservacionAnimaleDto) {
    return this.conservacionAnimalesService.update(+id, updateConservacionAnimaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conservacionAnimalesService.remove(+id);
  }
}
