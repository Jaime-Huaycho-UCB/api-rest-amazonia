import { Injectable } from '@nestjs/common';
import { CreateComunidadesMunicipioDto } from '../dto/create-comunidades-municipio.dto';
import { UpdateComunidadesMunicipioDto } from '../dto/update-comunidades-municipio.dto';

@Injectable()
export class ComunidadesMunicipiosService {
  create(createComunidadesMunicipioDto: CreateComunidadesMunicipioDto) {
    return 'This action adds a new comunidadesMunicipio';
  }

  findAll() {
    return `This action returns all comunidadesMunicipios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comunidadesMunicipio`;
  }

  update(id: number, updateComunidadesMunicipioDto: UpdateComunidadesMunicipioDto) {
    return `This action updates a #${id} comunidadesMunicipio`;
  }

  remove(id: number) {
    return `This action removes a #${id} comunidadesMunicipio`;
  }
}
