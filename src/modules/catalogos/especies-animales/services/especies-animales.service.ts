import { Injectable } from '@nestjs/common';
import { CreateEspeciesAnimaleDto } from '../dto/create-especies-animale.dto';
import { UpdateEspeciesAnimaleDto } from '../dto/update-especies-animale.dto';

@Injectable()
export class EspeciesAnimalesService {
  create(createEspeciesAnimaleDto: CreateEspeciesAnimaleDto) {
    return 'This action adds a new especiesAnimale';
  }

  findAll() {
    return `This action returns all especiesAnimales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especiesAnimale`;
  }

  update(id: number, updateEspeciesAnimaleDto: UpdateEspeciesAnimaleDto) {
    return `This action updates a #${id} especiesAnimale`;
  }

  remove(id: number) {
    return `This action removes a #${id} especiesAnimale`;
  }
}
