import { Injectable } from '@nestjs/common';
import { CreateAyudaDto } from '../dto/create-ayuda.dto';
import { UpdateAyudaDto } from '../dto/update-ayuda.dto';

@Injectable()
export class AyudasService {
  create(createAyudaDto: CreateAyudaDto) {
    return 'This action adds a new ayuda';
  }

  findAll() {
    return `This action returns all ayudas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ayuda`;
  }

  update(id: number, updateAyudaDto: UpdateAyudaDto) {
    return `This action updates a #${id} ayuda`;
  }

  remove(id: number) {
    return `This action removes a #${id} ayuda`;
  }
}
