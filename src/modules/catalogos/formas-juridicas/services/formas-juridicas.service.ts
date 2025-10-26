import { Injectable } from '@nestjs/common';
import { CreateFormasJuridicaDto } from '../dto/create-formas-juridica.dto';
import { UpdateFormasJuridicaDto } from '../dto/update-formas-juridica.dto';

@Injectable()
export class FormasJuridicasService {
  create(createFormasJuridicaDto: CreateFormasJuridicaDto) {
    return 'This action adds a new formasJuridica';
  }

  findAll() {
    return `This action returns all formasJuridicas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formasJuridica`;
  }

  update(id: number, updateFormasJuridicaDto: UpdateFormasJuridicaDto) {
    return `This action updates a #${id} formasJuridica`;
  }

  remove(id: number) {
    return `This action removes a #${id} formasJuridica`;
  }
}
