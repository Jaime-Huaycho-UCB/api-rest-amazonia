import { Injectable } from '@nestjs/common';
import { CreateConservacionAnimaleDto } from '../dto/create-conservacion-animale.dto';
import { UpdateConservacionAnimaleDto } from '../dto/update-conservacion-animale.dto';

@Injectable()
export class ConservacionAnimalesService {
  create(createConservacionAnimaleDto: CreateConservacionAnimaleDto) {
    return 'This action adds a new conservacionAnimale';
  }

  findAll() {
    return `This action returns all conservacionAnimales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conservacionAnimale`;
  }

  update(id: number, updateConservacionAnimaleDto: UpdateConservacionAnimaleDto) {
    return `This action updates a #${id} conservacionAnimale`;
  }

  remove(id: number) {
    return `This action removes a #${id} conservacionAnimale`;
  }
}
