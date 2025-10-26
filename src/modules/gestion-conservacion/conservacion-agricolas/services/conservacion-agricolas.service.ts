import { Injectable } from '@nestjs/common';
import { CreateConservacionAgricolaDto } from '../dto/create-conservacion-agricola.dto';
import { UpdateConservacionAgricolaDto } from '../dto/update-conservacion-agricola.dto';

@Injectable()
export class ConservacionAgricolasService {
  create(createConservacionAgricolaDto: CreateConservacionAgricolaDto) {
    return 'This action adds a new conservacionAgricola';
  }

  findAll() {
    return `This action returns all conservacionAgricolas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conservacionAgricola`;
  }

  update(id: number, updateConservacionAgricolaDto: UpdateConservacionAgricolaDto) {
    return `This action updates a #${id} conservacionAgricola`;
  }

  remove(id: number) {
    return `This action removes a #${id} conservacionAgricola`;
  }
}
