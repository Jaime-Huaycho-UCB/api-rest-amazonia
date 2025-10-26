import { Injectable } from '@nestjs/common';
import { CreateAreasDesarrolloDto } from '../dto/create-areas-desarrollo.dto';
import { UpdateAreasDesarrolloDto } from '../dto/update-areas-desarrollo.dto';

@Injectable()
export class AreasDesarrolloService {
  create(createAreasDesarrolloDto: CreateAreasDesarrolloDto) {
    return 'This action adds a new areasDesarrollo';
  }

  findAll() {
    return `This action returns all areasDesarrollo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} areasDesarrollo`;
  }

  update(id: number, updateAreasDesarrolloDto: UpdateAreasDesarrolloDto) {
    return `This action updates a #${id} areasDesarrollo`;
  }

  remove(id: number) {
    return `This action removes a #${id} areasDesarrollo`;
  }
}
