import { Injectable } from '@nestjs/common';
import { CreatePracticasAgricolaDto } from '../dto/create-practicas-agricola.dto';
import { UpdatePracticasAgricolaDto } from '../dto/update-practicas-agricola.dto';

@Injectable()
export class PracticasAgricolasService {
  create(createPracticasAgricolaDto: CreatePracticasAgricolaDto) {
    return 'This action adds a new practicasAgricola';
  }

  findAll() {
    return `This action returns all practicasAgricolas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} practicasAgricola`;
  }

  update(id: number, updatePracticasAgricolaDto: UpdatePracticasAgricolaDto) {
    return `This action updates a #${id} practicasAgricola`;
  }

  remove(id: number) {
    return `This action removes a #${id} practicasAgricola`;
  }
}
