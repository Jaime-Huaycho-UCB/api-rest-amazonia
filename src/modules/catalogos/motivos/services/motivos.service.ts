import { Injectable } from '@nestjs/common';
import { CreateMotivoDto } from '../dto/create-motivo.dto';
import { UpdateMotivoDto } from '../dto/update-motivo.dto';

@Injectable()
export class MotivosService {
  create(createMotivoDto: CreateMotivoDto) {
    return 'This action adds a new motivo';
  }

  findAll() {
    return `This action returns all motivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motivo`;
  }

  update(id: number, updateMotivoDto: UpdateMotivoDto) {
    return `This action updates a #${id} motivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} motivo`;
  }
}
