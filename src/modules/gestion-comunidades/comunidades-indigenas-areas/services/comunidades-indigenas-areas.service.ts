import { Injectable } from '@nestjs/common';
import { CreateComunidadesIndigenasAreaDto } from '../dto/create-comunidades-indigenas-area.dto';
import { UpdateComunidadesIndigenasAreaDto } from '../dto/update-comunidades-indigenas-area.dto';

@Injectable()
export class ComunidadesIndigenasAreasService {
  create(createComunidadesIndigenasAreaDto: CreateComunidadesIndigenasAreaDto) {
    return 'This action adds a new comunidadesIndigenasArea';
  }

  findAll() {
    return `This action returns all comunidadesIndigenasAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comunidadesIndigenasArea`;
  }

  update(id: number, updateComunidadesIndigenasAreaDto: UpdateComunidadesIndigenasAreaDto) {
    return `This action updates a #${id} comunidadesIndigenasArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} comunidadesIndigenasArea`;
  }
}
